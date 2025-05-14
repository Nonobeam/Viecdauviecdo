import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export class Logo {
  public static readonly google = <FontAwesomeIcon icon={faGoogle} />;
  public static readonly linkedIn = <FontAwesomeIcon icon={faLinkedin} />;
  public static readonly github = <FontAwesomeIcon icon={faGithub} />;
}