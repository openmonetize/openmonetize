/*
 * Copyright (C) 2025 OpenMonetize
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { FastifyRequest, FastifyReply } from 'fastify';
import { getDLQ, getQueue } from '../queue';
import { logger } from '../logger';

export async function getDLQItems(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const dlq = getDLQ();
    const counts = await dlq.getJobCounts();
    const jobs = await dlq.getJobs(['wait', 'active', 'delayed', 'paused'], 0, 100);

    return reply.send({
      counts,
      items: jobs.map(j => ({
        id: j.id,
        name: j.name,
        data: j.data,
        timestamp: j.timestamp,
        failedReason: j.failedReason
      }))
    });
  } catch (error) {
    logger.error({ error }, 'Failed to get DLQ items');
    return reply.code(500).send({ error: 'Failed to retrieve DLQ items' });
  }
}

export async function replayDLQ(
  request: FastifyRequest<{ Body: { jobIds?: string[] } }>,
  reply: FastifyReply
) {
  try {
    const dlq = getDLQ();
    const mainQueue = getQueue();
    const { jobIds } = request.body || {};

    let jobsToReplay;
    if (jobIds && jobIds.length > 0) {
      jobsToReplay = await Promise.all(jobIds.map(id => dlq.getJob(id)));
    } else {
      // Replay all waiting jobs
      jobsToReplay = await dlq.getJobs(['wait'], 0, 1000);
    }

    const validJobs = jobsToReplay.filter(j => j !== undefined && j !== null);
    
    if (validJobs.length === 0) {
      return reply.send({ message: 'No jobs to replay', count: 0 });
    }

    const replayPromises = validJobs.map(async (job) => {
      if (!job) return;
      
      // Add back to main queue
      // We strip the DLQ metadata to treat it as a fresh attempt (or keep it if we want history)
      // Here we keep the original data but maybe reset some counters if needed
      // But since we are adding a NEW job to the main queue, it will have a new ID or we can reuse the original ID if we want idempotency
      
      const originalData = { ...job.data };
      // Remove DLQ specific metadata if we want a clean retry, or keep it for audit
      // Let's keep it but add a replay flag
      
      await mainQueue.add(job.name, {
        ...originalData,
        _replayed_at: new Date().toISOString()
      }, {
        jobId: originalData._original_job_id || job.id // Try to use original ID for idempotency
      });

      // Remove from DLQ
      await job.remove();
    });

    await Promise.all(replayPromises);

    logger.info({ count: validJobs.length }, 'Replayed DLQ jobs');

    return reply.send({ 
      message: 'Jobs replayed successfully', 
      count: validJobs.length 
    });

  } catch (error) {
    logger.error({ error }, 'Failed to replay DLQ jobs');
    return reply.code(500).send({ error: 'Failed to replay jobs' });
  }
}
