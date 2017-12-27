export default class EvsPrev {
  constructor() {
    this.lists = [];
  }

  addEvent2(e) {
    e = { ...e };
    const col = this.peaks().findIndex(le => eventEnd(le) < e.start);

    if (col === -1) {
      e.offset = this.length;
      e.width = 1;
      this.lists.push([e]);
      return;
    }

    const end =
      this.peaks()
        .slice(col + 1)
        .findIndex(le => eventEnd(le) >= e.start) +
      col +
      1;

    if (end === col) {
      e.offset = col;
      e.width = this.length - col;
      this.lists[col].push(e);
      return;
    }

    const prev = this.lists[col - 1];

    if (prev) {
      const adjCol = ((col + end) / 2) | 0;
      e.offset = adjCol;
      e.width = end - adjCol;
      this.lists[adjCol].push(e);
      prev.width = adjCol - prev.offset;
      return;
    }

    e.offset = col;
    e.width = end - col;
    this.lists[col].push(e);
  }

  peaks() {
    return this.lists.map(l => l[l.length - 1]);
  }

  forEach(fn) {
    return this.lists.forEach(l => fn(l[l.length - 1]));
  }

  get length() {
    return this.lists.length;
  }

  elements() {
    let res = [];
    this.lists.forEach(l => (res = res.concat(l)));
    res.sort((a, b) => a.start - b.start);
    return res;
  }
}

function eventEnd(ev) {
  return ev.start + ev.duration;
}
