interface ILocalization {
  [key: string]: { [key: string]: string };
}

const localization: ILocalization = {
  comments: {
    en: 'Comments',
  },
  error_no_stories: {
    en: 'The data is currently unavailable.',
  },
  error_unknown: {
    en: 'Unknown error.',
  },
  rating: {
    en: 'Rating',
  },
};

export function getText(textId: string, currentLocale: string = 'en'): string {
  return localization[textId]
        ? localization[textId][currentLocale]
            ? localization[textId][currentLocale]
            : localization[textId].en
        : textId;
}

export default localization;
