Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getLine = getLine;
exports.moveNext = moveNext;
exports.get = get;
exports.getLocalContext = getLocalContext;
exports.select = select;

// TODO: docstrings

var _scopes = require('./scopes');

'use babel';
function getLine(ed, l) {
  return {
    scope: ed.scopeDescriptorForBufferPosition([l, 0]).scopes,
    line: ed.getTextInBufferRange([[l, 0], [l, Infinity]])
  };
}

function isBlank(_ref) {
  var line = _ref.line;
  var scope = _ref.scope;
  var allowDocstrings = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  for (var s of scope) {
    if (/\bcomment\b/.test(s) || !allowDocstrings && /\bdocstring\b/.test(s)) {
      return true;
    }
  }
  return (/^\s*(#.*)?$/.test(line)
  );
}
function isEnd(_ref2) {
  var line = _ref2.line;
  var scope = _ref2.scope;

  if (isStringEnd({ line: line, scope: scope })) {
    return true;
  }
  return (/^(end\b|\)|\]|\})/.test(line)
  );
}
function isStringEnd(_ref3) {
  var line = _ref3.line;
  var scope = _ref3.scope;

  scope = scope.join(' ');
  return (/\bstring\.multiline\.end\b/.test(scope) || /\bstring\.end\b/.test(scope) && /\bbacktick\b/.test(scope)
  );
}
function isCont(_ref4) {
  var line = _ref4.line;
  var scope = _ref4.scope;

  scope = scope.join(' ');
  if (/\bstring\b/.test(scope) && !/\bpunctuation\.definition\.string\b/.test(scope)) {
    return true;
  }

  return line.match(/^(else|elseif|catch|finally)\b/);
}
function isStart(lineInfo) {
  return !(/^\s/.test(lineInfo.line) || isBlank(lineInfo) || isEnd(lineInfo) || isCont(lineInfo));
}

function walkBack(ed, row) {
  while (row > 0 && !isStart(getLine(ed, row))) {
    row--;
  }
  return row;
}

function walkForward(ed, start) {
  var end = start;
  var mark = start;
  while (mark < ed.getLastBufferRow()) {
    mark++;
    var lineInfo = getLine(ed, mark);

    if (isStart(lineInfo)) {
      break;
    }
    if (isEnd(lineInfo)) {
      // An `end` only counts when  there still are unclosed blocks (indicated by `forLines`
      // returning a non-empty array).
      // If the line closes a multiline string we also take that as ending the block.
      if (!((0, _scopes.forLines)(ed, start, mark - 1).length === 0) || isStringEnd(lineInfo)) {
        end = mark;
      }
    } else if (!(isBlank(lineInfo) || isStart(lineInfo))) {
      end = mark;
    }
  }
  return end;
}

function getRange(ed, row) {
  var start = walkBack(ed, row);
  var end = walkForward(ed, start);
  if (start <= row && row <= end) {
    return [[start, 0], [end, Infinity]];
  }
}

function getSelection(ed, sel) {
  var _sel$getBufferRange = sel.getBufferRange();

  var start = _sel$getBufferRange.start;
  var end = _sel$getBufferRange.end;

  var range = [[start.row, start.column], [end.row, end.column]];
  while (isBlank(getLine(ed, range[0][0]), true) && range[0][0] <= range[1][0]) {
    range[0][0]++;
    range[0][1] = 0;
  }
  while (isBlank(getLine(ed, range[1][0]), true) && range[1][0] >= range[0][0]) {
    range[1][0]--;
    range[1][1] = Infinity;
  }
  return range;
}

function moveNext(ed, sel, range) {
  // Ensure enough room at the end of the buffer
  var row = range[1][0];
  var last = undefined;
  while ((last = ed.getLastBufferRow()) < row + 2) {
    if (last !== row && !isBlank(getLine(ed, last))) {
      break;
    }
    sel.setBufferRange([[last, Infinity], [last, Infinity]]);
    sel.insertText('\n');
  }
  // Move the cursor
  var to = row + 1;
  while (to < ed.getLastBufferRow() && isBlank(getLine(ed, to))) {
    to++;
  }
  to = walkForward(ed, to);
  return sel.setBufferRange([[to, Infinity], [to, Infinity]]);
}

function getRanges(ed) {
  var ranges = ed.getSelections().map(function (sel) {
    return {
      selection: sel,
      range: sel.isEmpty() ? getRange(ed, sel.getHeadBufferPosition().row) : getSelection(ed, sel)
    };
  });
  return ranges.filter(function (_ref5) {
    var range = _ref5.range;

    return range && ed.getTextInBufferRange(range).trim();
  });
}

function get(ed) {
  return getRanges(ed).map(function (_ref6) {
    var range = _ref6.range;
    var selection = _ref6.selection;

    return {
      range: range,
      selection: selection,
      line: range[0][0],
      text: ed.getTextInBufferRange(range)
    };
  });
}

function getLocalContext(editor, row) {
  var range = getRange(editor, row);
  var context = range ? editor.getTextInBufferRange(range) : '';
  // NOTE:
  // backend code expects startRow to be number for most cases, e.g.: `row = row - startRow`
  // so let's just return `0` when there is no local context
  // to check there is a context or not, just check `isempty(context)`
  var startRow = range ? range[0][0] : 0;
  return {
    context: context,
    startRow: startRow
  };
}

function select() {
  var ed = arguments.length <= 0 || arguments[0] === undefined ? atom.workspace.getActiveTextEditor() : arguments[0];

  if (!ed) return;
  return ed.mutateSelectedText(function (selection) {
    var range = getRange(ed, selection.getHeadBufferPosition().row);
    if (range) {
      selection.setBufferRange(range);
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NoaXZha3Jpc2huYWthcm5hdGkvLnZhci9hcHAvaW8uYXRvbS5BdG9tL2RhdGEvcGFja2FnZXMvanVsaWEtY2xpZW50L2xpYi9taXNjL2Jsb2Nrcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztzQkFHeUIsVUFBVTs7QUFIbkMsV0FBVyxDQUFBO0FBS0osU0FBUyxPQUFPLENBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtBQUM5QixTQUFPO0FBQ0wsU0FBSyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07QUFDekQsUUFBSSxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7R0FDdkQsQ0FBQTtDQUNGOztBQUVELFNBQVMsT0FBTyxDQUFFLElBQWEsRUFBMkI7TUFBdkMsSUFBSSxHQUFMLElBQWEsQ0FBWixJQUFJO01BQUUsS0FBSyxHQUFaLElBQWEsQ0FBTixLQUFLO01BQUcsZUFBZSx5REFBRyxLQUFLOztBQUN0RCxPQUFLLElBQU0sQ0FBQyxJQUFJLEtBQUssRUFBRTtBQUNyQixRQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQUFBQyxFQUFFO0FBQzFFLGFBQU8sSUFBSSxDQUFBO0tBQ1o7R0FDRjtBQUNELFNBQU8sY0FBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFBQTtDQUNoQztBQUNELFNBQVMsS0FBSyxDQUFFLEtBQWUsRUFBRTtNQUFmLElBQUksR0FBTixLQUFlLENBQWIsSUFBSTtNQUFFLEtBQUssR0FBYixLQUFlLENBQVAsS0FBSzs7QUFDM0IsTUFBSSxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUosSUFB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TSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUNuQyxNQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQTs7Ozs7QUFLL0QsTUFBTSxRQUFRLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDeEMsU0FBTztBQUNMLFdBQU8sRUFBUCxPQUFPO0FBQ1AsWUFBUSxFQUFSLFFBQVE7R0FDVCxDQUFBO0NBQ0Y7O0FBRU0sU0FBUyxNQUFNLEdBQTZDO01BQTNDLEVBQUUseURBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRTs7QUFDL0QsTUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFNO0FBQ2YsU0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUMsVUFBQSxTQUFTLEVBQUk7QUFDeEMsUUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUNqRSxRQUFJLEtBQUssRUFBRTtBQUNULGVBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDaEM7R0FDRixDQUFDLENBQUE7Q0FDSCIsImZpbGUiOiIvaG9tZS9zaGl2YWtyaXNobmFrYXJuYXRpLy52YXIvYXBwL2lvLmF0b20uQXRvbS9kYXRhL3BhY2thZ2VzL2p1bGlhLWNsaWVudC9saWIvbWlzYy9ibG9ja3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJ1xuLy8gVE9ETzogZG9jc3RyaW5nc1xuXG5pbXBvcnQgeyBmb3JMaW5lcyB9IGZyb20gJy4vc2NvcGVzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGluZSAoZWQsIGwpIHtcbiAgcmV0dXJuIHtcbiAgICBzY29wZTogZWQuc2NvcGVEZXNjcmlwdG9yRm9yQnVmZmVyUG9zaXRpb24oW2wsIDBdKS5zY29wZXMsXG4gICAgbGluZTogZWQuZ2V0VGV4dEluQnVmZmVyUmFuZ2UoW1tsLCAwXSwgW2wsIEluZmluaXR5XV0pXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNCbGFuayAoe2xpbmUsIHNjb3BlfSwgYWxsb3dEb2NzdHJpbmdzID0gZmFsc2UpIHtcbiAgZm9yIChjb25zdCBzIG9mIHNjb3BlKSB7XG4gICAgaWYgKC9cXGJjb21tZW50XFxiLy50ZXN0KHMpIHx8ICghYWxsb3dEb2NzdHJpbmdzICYmIC9cXGJkb2NzdHJpbmdcXGIvLnRlc3QocykpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gL15cXHMqKCMuKik/JC8udGVzdChsaW5lKVxufVxuZnVuY3Rpb24gaXNFbmQgKHsgbGluZSwgc2NvcGUgfSkge1xuICBpZiAoaXNTdHJpbmdFbmQoeyBsaW5lLCBzY29wZSB9KSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIC9eKGVuZFxcYnxcXCl8XFxdfFxcfSkvLnRlc3QobGluZSlcbn1cbmZ1bmN0aW9uIGlzU3RyaW5nRW5kICh7IGxpbmUsIHNjb3BlIH0pIHtcbiAgc2NvcGUgPSBzY29wZS5qb2luKCcgJylcbiAgcmV0dXJuIC9cXGJzdHJpbmdcXC5tdWx0aWxpbmVcXC5lbmRcXGIvLnRlc3Qoc2NvcGUpIHx8XG4gICAgICAgICgvXFxic3RyaW5nXFwuZW5kXFxiLy50ZXN0KHNjb3BlKSAmJiAvXFxiYmFja3RpY2tcXGIvLnRlc3Qoc2NvcGUpKVxufVxuZnVuY3Rpb24gaXNDb250ICh7IGxpbmUsIHNjb3BlIH0pIHtcbiAgc2NvcGUgPSBzY29wZS5qb2luKCcgJylcbiAgaWYgKC9cXGJzdHJpbmdcXGIvLnRlc3Qoc2NvcGUpICYmICEoL1xcYnB1bmN0dWF0aW9uXFwuZGVmaW5pdGlvblxcLnN0cmluZ1xcYi8udGVzdChzY29wZSkpKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBsaW5lLm1hdGNoKC9eKGVsc2V8ZWxzZWlmfGNhdGNofGZpbmFsbHkpXFxiLylcbn1cbmZ1bmN0aW9uIGlzU3RhcnQgKGxpbmVJbmZvKSB7XG4gIHJldHVybiAhKC9eXFxzLy50ZXN0KGxpbmVJbmZvLmxpbmUpIHx8IGlzQmxhbmsobGluZUluZm8pIHx8IGlzRW5kKGxpbmVJbmZvKSB8fCBpc0NvbnQobGluZUluZm8pKVxufVxuXG5mdW5jdGlvbiB3YWxrQmFjayhlZCwgcm93KSB7XG4gIHdoaWxlICgocm93ID4gMCkgJiYgIWlzU3RhcnQoZ2V0TGluZShlZCwgcm93KSkpIHtcbiAgICByb3ctLVxuICB9XG4gIHJldHVybiByb3dcbn1cblxuZnVuY3Rpb24gd2Fsa0ZvcndhcmQgKGVkLCBzdGFydCkge1xuICBsZXQgZW5kID0gc3RhcnRcbiAgbGV0IG1hcmsgPSBzdGFydFxuICB3aGlsZSAobWFyayA8IGVkLmdldExhc3RCdWZmZXJSb3coKSkge1xuICAgIG1hcmsrK1xuICAgIGNvbnN0IGxpbmVJbmZvID0gZ2V0TGluZShlZCwgbWFyaylcblxuICAgIGlmIChpc1N0YXJ0KGxpbmVJbmZvKSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGlzRW5kKGxpbmVJbmZvKSkge1xuICAgICAgLy8gQW4gYGVuZGAgb25seSBjb3VudHMgd2hlbiAgdGhlcmUgc3RpbGwgYXJlIHVuY2xvc2VkIGJsb2NrcyAoaW5kaWNhdGVkIGJ5IGBmb3JMaW5lc2BcbiAgICAgIC8vIHJldHVybmluZyBhIG5vbi1lbXB0eSBhcnJheSkuXG4gICAgICAvLyBJZiB0aGUgbGluZSBjbG9zZXMgYSBtdWx0aWxpbmUgc3RyaW5nIHdlIGFsc28gdGFrZSB0aGF0IGFzIGVuZGluZyB0aGUgYmxvY2suXG4gICAgICBpZiAoXG4gICAgICAgICAgICAhKGZvckxpbmVzKGVkLCBzdGFydCwgbWFyay0xKS5sZW5ndGggPT09IDApIHx8XG4gICAgICAgICAgICBpc1N0cmluZ0VuZChsaW5lSW5mbylcbiAgICAgICAgICkge1xuICAgICAgICBlbmQgPSBtYXJrXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKGlzQmxhbmsobGluZUluZm8pIHx8IGlzU3RhcnQobGluZUluZm8pKSkge1xuICAgICAgZW5kID0gbWFya1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW5kXG59XG5cbmZ1bmN0aW9uIGdldFJhbmdlIChlZCwgcm93KSB7XG4gIGNvbnN0IHN0YXJ0ID0gd2Fsa0JhY2soZWQsIHJvdylcbiAgY29uc3QgZW5kID0gd2Fsa0ZvcndhcmQoZWQsIHN0YXJ0KVxuICBpZiAoc3RhcnQgPD0gcm93ICYmIHJvdyA8PSBlbmQpIHtcbiAgICByZXR1cm4gW1tzdGFydCwgMF0sIFtlbmQsIEluZmluaXR5XV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRTZWxlY3Rpb24gKGVkLCBzZWwpIHtcbiAgY29uc3Qge3N0YXJ0LCBlbmR9ID0gc2VsLmdldEJ1ZmZlclJhbmdlKClcbiAgY29uc3QgcmFuZ2UgPSBbW3N0YXJ0LnJvdywgc3RhcnQuY29sdW1uXSwgW2VuZC5yb3csIGVuZC5jb2x1bW5dXVxuICB3aGlsZSAoaXNCbGFuayhnZXRMaW5lKGVkLCByYW5nZVswXVswXSksIHRydWUpICYmIChyYW5nZVswXVswXSA8PSByYW5nZVsxXVswXSkpIHtcbiAgICByYW5nZVswXVswXSsrXG4gICAgcmFuZ2VbMF1bMV0gPSAwXG4gIH1cbiAgd2hpbGUgKGlzQmxhbmsoZ2V0TGluZShlZCwgcmFuZ2VbMV1bMF0pLCB0cnVlKSAmJiAocmFuZ2VbMV1bMF0gPj0gcmFuZ2VbMF1bMF0pKSB7XG4gICAgcmFuZ2VbMV1bMF0tLVxuICAgIHJhbmdlWzFdWzFdID0gSW5maW5pdHlcbiAgfVxuICByZXR1cm4gcmFuZ2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVOZXh0IChlZCwgc2VsLCByYW5nZSkge1xuICAvLyBFbnN1cmUgZW5vdWdoIHJvb20gYXQgdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGNvbnN0IHJvdyA9IHJhbmdlWzFdWzBdXG4gIGxldCBsYXN0XG4gIHdoaWxlICgobGFzdCA9IGVkLmdldExhc3RCdWZmZXJSb3coKSkgPCAocm93KzIpKSB7XG4gICAgaWYgKChsYXN0ICE9PSByb3cpICYmICFpc0JsYW5rKGdldExpbmUoZWQsIGxhc3QpKSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgc2VsLnNldEJ1ZmZlclJhbmdlKFtbbGFzdCwgSW5maW5pdHldLCBbbGFzdCwgSW5maW5pdHldXSlcbiAgICBzZWwuaW5zZXJ0VGV4dCgnXFxuJylcbiAgfVxuICAvLyBNb3ZlIHRoZSBjdXJzb3JcbiAgbGV0IHRvID0gcm93ICsgMVxuICB3aGlsZSAoKHRvIDwgZWQuZ2V0TGFzdEJ1ZmZlclJvdygpKSAmJiBpc0JsYW5rKGdldExpbmUoZWQsIHRvKSkpIHtcbiAgICB0bysrXG4gIH1cbiAgdG8gPSB3YWxrRm9yd2FyZChlZCwgdG8pXG4gIHJldHVybiBzZWwuc2V0QnVmZmVyUmFuZ2UoW1t0bywgSW5maW5pdHldLCBbdG8sIEluZmluaXR5XV0pXG59XG5cbmZ1bmN0aW9uIGdldFJhbmdlcyAoZWQpIHtcbiAgY29uc3QgcmFuZ2VzID0gZWQuZ2V0U2VsZWN0aW9ucygpLm1hcChzZWwgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZWxlY3Rpb246IHNlbCxcbiAgICAgIHJhbmdlOiBzZWwuaXNFbXB0eSgpID9cbiAgICAgICAgZ2V0UmFuZ2UoZWQsIHNlbC5nZXRIZWFkQnVmZmVyUG9zaXRpb24oKS5yb3cpIDpcbiAgICAgICAgZ2V0U2VsZWN0aW9uKGVkLCBzZWwpXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmFuZ2VzLmZpbHRlcigoeyByYW5nZSB9KSA9PiB7XG4gICAgcmV0dXJuIHJhbmdlICYmIGVkLmdldFRleHRJbkJ1ZmZlclJhbmdlKHJhbmdlKS50cmltKClcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldCAoZWQpIHtcbiAgcmV0dXJuIGdldFJhbmdlcyhlZCkubWFwKCh7IHJhbmdlLCBzZWxlY3Rpb24gfSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByYW5nZSxcbiAgICAgIHNlbGVjdGlvbixcbiAgICAgIGxpbmU6IHJhbmdlWzBdWzBdLFxuICAgICAgdGV4dDogZWQuZ2V0VGV4dEluQnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxDb250ZXh0IChlZGl0b3IsIHJvdykge1xuICBjb25zdCByYW5nZSA9IGdldFJhbmdlKGVkaXRvciwgcm93KVxuICBjb25zdCBjb250ZXh0ID0gcmFuZ2UgPyBlZGl0b3IuZ2V0VGV4dEluQnVmZmVyUmFuZ2UocmFuZ2UpIDogJydcbiAgLy8gTk9URTpcbiAgLy8gYmFja2VuZCBjb2RlIGV4cGVjdHMgc3RhcnRSb3cgdG8gYmUgbnVtYmVyIGZvciBtb3N0IGNhc2VzLCBlLmcuOiBgcm93ID0gcm93IC0gc3RhcnRSb3dgXG4gIC8vIHNvIGxldCdzIGp1c3QgcmV0dXJuIGAwYCB3aGVuIHRoZXJlIGlzIG5vIGxvY2FsIGNvbnRleHRcbiAgLy8gdG8gY2hlY2sgdGhlcmUgaXMgYSBjb250ZXh0IG9yIG5vdCwganVzdCBjaGVjayBgaXNlbXB0eShjb250ZXh0KWBcbiAgY29uc3Qgc3RhcnRSb3cgPSByYW5nZSA/IHJhbmdlWzBdWzBdIDogMFxuICByZXR1cm4ge1xuICAgIGNvbnRleHQsXG4gICAgc3RhcnRSb3dcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0IChlZCA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKSkge1xuICBpZiAoIWVkKSByZXR1cm5cbiAgcmV0dXJuIGVkLm11dGF0ZVNlbGVjdGVkVGV4dChzZWxlY3Rpb24gPT4ge1xuICAgIGNvbnN0IHJhbmdlID0gZ2V0UmFuZ2UoZWQsIHNlbGVjdGlvbi5nZXRIZWFkQnVmZmVyUG9zaXRpb24oKS5yb3cpXG4gICAgaWYgKHJhbmdlKSB7XG4gICAgICBzZWxlY3Rpb24uc2V0QnVmZmVyUmFuZ2UocmFuZ2UpXG4gICAgfVxuICB9KVxufVxuIl19