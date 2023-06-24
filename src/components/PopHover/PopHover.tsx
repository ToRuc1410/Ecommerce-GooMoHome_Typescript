import { FloatingPortal, useFloating, arrow, shift, offset, type Placement } from '@floating-ui/react'
import { useRef, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  // nơi có chứa popHover
  children: React.ReactNode
  // Nơi render nội dung khi hover vào
  renderPopHover: React.ReactNode
  className?: string
  // cho popHover ở vị trí nào
  placement?: Placement
}
export default function PopHover({ children, renderPopHover, className, placement = 'bottom-end' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(4), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  // tạo ra mỗi id riêng để phân biệt ra từng PopHover
  const id = useId()
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                left: x ?? 0,
                top: y ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.25 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-20 -translate-y-full border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />

              {renderPopHover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
