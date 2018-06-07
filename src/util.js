/* Do not call Object.prototype methods directly,
such as hasOwnProperty propertyIsEnumerable, and isPrototypeOf. */
export const has = Object.prototype.hasOwnProperty;

/* Get token from localstorage */
export const getToken = () => {
  if (has.call(localStorage, 'token')) {
    return localStorage.token;
  }
  return false;
};

/* Validate URL */
export const testUrl = (url) => {
  if (!url || url.trim() === '') {
    return true;
  }
  const urlRegEx = new RegExp(
  // eslint-disable-next-line
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  );
  return urlRegEx.test(url.toLowerCase().trim());
};

/* Validate email */
export const validateEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/* Modify user entered URL to valid URL and send as a query to redirect route */
export const constructURL = (url) => {
  if (!url) {
    return '';
  }
  if (validateEmail(url)) {
    return `/redirect?url=${`mailto:${encodeURI(url)}`}`;
  }
  return `/redirect?url=${url.includes(':') ? url : `http://${encodeURI(url)}`}`;
};

/* Get a parent node and alter the href attribute of anchor tag */
export const formatURL = (querySelector) => {
  let i;
  const links = document.querySelector(querySelector).getElementsByTagName('a');
  for (i = 0; i < links.length; i += 1) {
    const url = links[i].getAttribute('href');
    links[i].setAttribute('href', constructURL(url));
    // let blank= links[i].getAttribute('href')
    links[i].setAttribute('target', '_blank');
  }
};

/* Swap elements in DOM */
export const swapElements = (elm1, elm2) => {
  const parent1 = elm1.parentNode;
  const next1 = elm1.nextSibling;
  const parent2 = elm2.parentNode;
  const next2 = elm2.nextSibling;

  parent1.insertBefore(elm2, next1);
  parent2.insertBefore(elm1, next2);
};


function BackgroundNode({ node, loadedClassName }) {
  let src = node.getAttribute('data-background-image-url');
  const show = (onComplete) => {
    requestAnimationFrame(() => {
      src = (src === '') ? '/static/image.png' : src;
      // eslint-disable-next-line
      node.style.backgroundImage = `url(${src}),url(/static/image.png)`;
      node.classList.add(loadedClassName);
      onComplete();
    });
  };

  return {
    node,
    // onComplete is called after the image is done loading.
    load: (onComplete) => {
      const img = new Image();
      img.onload = show(onComplete);
      img.src = src;
    },
  };
}

// eslint-disable-next-line
let defaultOptions = {
  selector: '[data-background-image-url]',
  loadedClassName: 'loaded',
};

/* Lazy load background images,
  DON'T FORGET TO ADD POLLYFILL INTERSECTION-OBSERVER
*/

export const BackgroundLazyLoader = ({ selector, loadedClassName } = defaultOptions) => {
  let nodes = [].slice.apply(document.querySelectorAll(selector))
    .map(node => new BackgroundNode({ node, loadedClassName }));

  const callback = (entries, observer) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) {
        return;
      }

      const obj = nodes.find(it => it.node.isSameNode(target));

      if (obj) {
        obj.load(() => {
          // Unobserve the node:
          observer.unobserve(target);
          // Remove this node from our list:
          nodes = nodes.filter(n => !n.node.isSameNode(target));

          // If there are no remaining unloaded nodes,
          // disconnect the observer since we don't need it anymore.
          if (!nodes.length) {
            observer.disconnect();
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(callback);
  nodes.forEach(node => observer.observe(node.node));
};

export const localTime = (t) => {
  if (!t) return;
  let time = t;
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
    if (time[0] < 10) {
      time.unshift('0');
    }
  }
  return time.join(''); // return adjusted time or original string
};

export const formatDate = (time) => {
  if (!time || !time.includes('-')) return time;
  const str = time.trim();
  const date = str.split('-');
  const from = localTime(date[0].trim());
  const to = localTime(date[1].trim());
  return `${from} to ${to}`;
};


export const splitTimes = (times) => {
  if (!times) return times;
  if (times === 'Closed') return times;
  const timings = times.split(';');
  const construct = [];
  timings.forEach(time => construct.push(formatDate(time)));

  return construct.join(' , ');
};


export const delay = ms => new Promise(fn => setTimeout(fn, ms));

export const loadScript = (src) => {
  const element = document.createElement('script');
  element.setAttribute('src', src);
  document.head.appendChild(element);
};

// https://codepen.io/codebeast/pen/ooZYvN
// export const isBottomVisible = (elem) => {
//   const scrollY = elem.scrollY;
//   const visible = elem.clientHeight;
//   const pageHeight = elem.scrollHeight;
//   const bottomOfPage = visible + scrollY >= pageHeight;
//   // console.log(bottomOfPage, pageHeight,visible);
//   return bottomOfPage || pageHeight < visible;
// };

// https://stackoverflow.com/questions/876115/how-can-i-determine-if-a-div-is-scrolled-to-the-bottom
export const isBottomVisible = elem => elem.scrollTop === (elem.scrollHeight - elem.offsetHeight);

export const generateId = () => Math.floor(Math.random() * 10000);

// https://www.kirupa.com/html5/get_element_position_using_javascript.htm
export const getPosition = (el) => {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName == 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      const yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos,
  };
};
