import type { CarouselArrowProps } from '../../types/carousel'
import { Icon } from './Icon'
import styles from './CarouselArrow.module.css'

export function CarouselArrow({
  direction,
  label,
  controlsId,
  onClick,
  disabled = false,
}: CarouselArrowProps) {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      aria-controls={controlsId}
      onClick={onClick}
      disabled={disabled}
      data-direction={direction}
    >
      <Icon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} />
    </button>
  )
}
