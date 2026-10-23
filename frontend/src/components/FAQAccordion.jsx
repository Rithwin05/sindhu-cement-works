import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export function FAQAccordion({ items, testid = 'faq' }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border-y border-line" data-testid={testid}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`${testid}-panel-${i}`}
              data-testid={`${testid}-q-${i}`}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-[15px] font-semibold text-graphite">{item.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                <Plus className={`h-4 w-4 ${isOpen ? 'text-safety' : 'text-steel'}`} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${testid}-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-steel" data-testid={`${testid}-a-${i}`}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
