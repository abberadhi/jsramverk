export default function url(path) {
    try {
    return window.document.location.host === "www.student.bth.se"
      ? `/~abra19/editor${path}`
      : `${path}`;
    } catch {
      return `${path}`;
    }
  }