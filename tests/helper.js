export const findPageElements = selector => {
  return browser.elements(selector).value;
};

export const getPageTitle = () => browser.getTitle();
export const getPageHTML = element => browser.getHTML(element);

export const getElementText = element => {
  return browser.elementIdText(element.ELEMENT).value;
};

export const goToUrl = url => {
  browser.url(url);
};