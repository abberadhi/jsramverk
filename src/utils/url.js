export default function url(path) {
    return window.document.location.host === "www.student.bth.se"
      ? `/~abra19/editor${path}`
      : `${path}`;
  }