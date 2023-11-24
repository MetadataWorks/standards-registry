import classnames from 'classnames';
import styles from './style.module.scss';
import Link from '../Link';

export default function PhaseBanner({ homepage }) {
  return (
    <div
      className={classnames('nhsuk-phase-banner', styles.phaseBanner, {
        [styles.homepage]: homepage,
      })}
    >
      <div
        className={classnames('nhsuk-width-container', styles.inner, {
          [styles.homepage]: homepage,
        })}
      >
        <span className="nhsuk-u-font-size-14">
          <strong
            className={classnames('nhsuk-tag', styles.tag, {
              [styles.homepage]: homepage,
            })}
          >
            {' '}
            BETA{' '}
          </strong>
          <span className="nhsuk-phase-banner__text">
            This is a new service powered by Metdataworks. Your{' '}
            <Link
              className={classnames('nhsuk-phase-banner', styles.bannerLink, {
                [styles.homepage]: homepage,
              })}
              href="https://forms.office.com/e/VQTTC04qxb"
              newWindow={true}
            >
              feedback
              <span className="nhsuk-u-visually-hidden">
                opens in a new window
              </span>
            </Link>{' '}
            will help us improve it.
          </span>
        </span>
      </div>
    </div>
  );
}
