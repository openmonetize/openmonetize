"use client";

import { VISUAL_FLOW_STEPS } from "@/app/(dashboard)/playground/constants";

interface VisualDataFlowProps {
  activeStep: string | null;
}

// CSS for animations
const styles = `
  @keyframes flowPulse {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: -20;
    }
  }

  @keyframes iconPulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes ringPulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .flow-line-animated {
    stroke-dasharray: 8 4;
    animation: dash 0.5s linear infinite;
  }

  .flow-particle {
    animation: flowPulse 1s ease-in-out infinite;
  }

  .icon-active {
    animation: iconPulse 1s ease-in-out infinite;
  }

  .ring-pulse {
    animation: ringPulse 1.5s ease-out infinite;
  }

  .step-completed {
    animation: bounce 0.5s ease-out;
  }
`;

export function VisualDataFlow({ activeStep }: VisualDataFlowProps) {
  const activeIndex = activeStep
    ? VISUAL_FLOW_STEPS.findIndex((s) => s.id === activeStep)
    : -1;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="w-full py-8 px-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-slate-700 mb-6 overflow-hidden shadow-2xl relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
        </div>

        {/* Title */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            Request Flow
          </h3>
        </div>

        <div className="flex justify-between items-center relative z-10 px-4">
          {/* SVG Connecting Line */}
          <svg
            className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 z-0"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            {/* Background line */}
            <line
              x1="8"
              y1="1"
              x2="92"
              y2="1"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-slate-700"
            />

            {/* Animated dashed line for active flow */}
            {activeIndex >= 0 && (
              <line
                x1="8"
                y1="1"
                x2="92"
                y2="1"
                stroke="url(#flowGradient)"
                strokeWidth="0.4"
                className="flow-line-animated"
              />
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient
                id="flowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>

          {/* Data particle traveling along the line */}
          {activeStep && (
            <div
              className="absolute top-1/2 -translate-y-1/2 z-20 flow-particle"
              style={{
                left: `${(activeIndex / (VISUAL_FLOW_STEPS.length - 1)) * 84 + 8}%`,
              }}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/50" />
            </div>
          )}

          {VISUAL_FLOW_STEPS.map((step, index) => {
            const isActive = activeStep === step.id;
            const isPast = activeIndex >= index && activeIndex >= 0;

            return (
              <div
                key={step.id}
                className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${isPast && !isActive ? "step-completed" : ""}`}
              >
                {/* Pulsing ring effect for active step */}
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-blue-400 ring-pulse" />
                )}

                <div
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg
                    ${isActive ? `${step.bg} ${step.color} shadow-xl ring-4 ring-white/10 icon-active` : ""}
                    ${!isActive && isPast ? "bg-gradient-to-br from-slate-700 to-slate-800 text-white border border-slate-600" : ""}
                    ${!isActive && !isPast ? "bg-slate-900 text-slate-600 border border-slate-800" : ""}
                  `}
                >
                  <step.icon className="w-6 h-6" />
                </div>

                <div className="text-center">
                  <span
                    className={`
                    text-xs font-semibold transition-all duration-300 block
                    ${isActive ? "text-white" : "text-slate-500"}
                    ${isPast && !isActive ? "text-slate-400" : ""}
                  `}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status message */}
        <div className="mt-6 text-center h-8 relative z-10">
          {activeStep ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400 font-medium">
                {activeStep === "app" && "Sending Request..."}
                {activeStep === "gateway" && "Authenticating & Routing..."}
                {activeStep === "ingestion" && "High-speed Event Capture..."}
                {activeStep === "rating" && "Calculating Cost & Metering..."}
                {activeStep === "db" && "Updating Wallet Balance..."}
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-600">
              Ready to process requests
            </span>
          )}
        </div>
      </div>
    </>
  );
}
