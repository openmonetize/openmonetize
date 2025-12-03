'use client';

import { VISUAL_FLOW_STEPS } from '@/app/(dashboard)/playground/constants';

interface VisualDataFlowProps {
  activeStep: string | null;
}

export function VisualDataFlow({ activeStep }: VisualDataFlowProps) {
  return (
    <div className="w-full py-6 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 overflow-hidden">
      <div className="flex justify-between items-center relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-0" />
        
        {VISUAL_FLOW_STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isPast = activeStep ? VISUAL_FLOW_STEPS.findIndex(s => s.id === activeStep) >= index : false;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 transition-all duration-300">
              <div 
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
                  ${isActive ? `${step.bg} ${step.color} border-white dark:border-slate-700 shadow-lg scale-110 ring-4 ring-blue-100 dark:ring-blue-900/30` : ''}
                  ${!isActive && isPast ? 'bg-slate-800 text-white border-slate-800 dark:bg-slate-700 dark:border-slate-600' : ''}
                  ${!isActive && !isPast ? 'bg-white dark:bg-slate-950 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800' : ''}
                `}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-slate-900 dark:text-slate-100 font-bold' : 'text-slate-500 dark:text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-center h-6">
        {activeStep && (
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium animate-pulse">
            {activeStep === 'app' && 'Sending Request...'}
            {activeStep === 'gateway' && 'Authenticating & Routing...'}
            {activeStep === 'ingestion' && 'High-speed Event Capture...'}
            {activeStep === 'rating' && 'Calculating Cost & Metering...'}
            {activeStep === 'db' && 'Updating Wallet Balance...'}
          </span>
        )}
      </div>
    </div>
  );
}
