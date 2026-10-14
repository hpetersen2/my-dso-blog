import {useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';

import {skillSlides} from '../../data/skills';
import styles from './skill-carousel.module.css';

export default function SkillCarousel(): ReactNode {
  const {withBaseUrl} = useBaseUrlUtils();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const slideOffset = (index: number): number => {
    const track = trackRef.current;
    if (!track) {
      return 0;
    }
    const first = track.children[0] as HTMLElement;
    return (track.children[index] as HTMLElement).offsetLeft - first.offsetLeft;
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    let closest = 0;
    skillSlides.forEach((_, index) => {
      const distance = Math.abs(slideOffset(index) - track.scrollLeft);
      const closestDistance = Math.abs(slideOffset(closest) - track.scrollLeft);
      if (distance < closestDistance) {
        closest = index;
      }
    });
    setActive(closest);
  };

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({left: slideOffset(index), behavior: 'smooth'});
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {skillSlides.map((slide, slideIndex) => (
          <div
            className={styles.slide}
            key={slide[0].name}
            role="group"
            aria-label={`Skills ${slideIndex + 1} of ${skillSlides.length}`}>
            {slide.map((skill) => (
              <div className={styles.row} key={skill.name}>
                <div className={styles.skill}>
                  <img src={withBaseUrl(skill.icon)} alt="" />
                  <span>{skill.shortLabel}</span>
                </div>
                <ul className={styles.list}>
                  {skill.uses.map((use) => (
                    <li key={use}>{use}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {skillSlides.map((slide, index) => (
          <button
            key={slide[0].name}
            type="button"
            className={[styles.dot, index === active && styles.dotActive]
              .filter(Boolean)
              .join(' ')}
            aria-label={`Show skills ${index + 1}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
