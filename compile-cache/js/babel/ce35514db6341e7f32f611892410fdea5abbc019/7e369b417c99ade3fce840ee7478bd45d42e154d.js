Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.formatCode = formatCode;
exports.activate = activate;
exports.deactivate = deactivate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/** @babel */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _connection = require('../connection');

var _atom = require('atom');

var format = _connection.client['import']('format');

function formatCode() {
  var editor = atom.workspace.getActiveTextEditor();
  if (!editor) return;

  var selections = editor.getSelections();
  if (selections.length === 1 && !selections[0].getText()) {
    formatEditor(editor);
  } else {
    selections.forEach(function (selection) {
      formatEditorWithSelection(editor, selection);
    });
  }
}

function formatEditor(editor) {
  var range = editor.getBuffer().getRange();
  return formatEditorTextInRange(editor, range, editor.getText());
}

function formatEditorWithSelection(editor, selection) {
  var range = selection.getBufferRange();
  return formatEditorTextInRange(editor, range, selection.getText());
}

function formatEditorTextInRange(editor, range, text) {
  var dir = _path2['default'].dirname(_connection.client.editorPath(editor));
  var marker = markRange(editor, range);
  // NOTE: Branch on `getSoftTabs` if supported by formatter.
  var indent = editor.getTabLength();
  var margin = editor.getPreferredLineLength();
  format({
    text: text,
    dir: dir,
    indent: indent,
    margin: margin
  }).then(function (_ref) {
    var error = _ref.error;
    var formattedtext = _ref.formattedtext;

    if (error) {
      atom.notifications.addError('Julia-Client: Format-Code', {
        description: error,
        dismissable: true
      });
    } else {
      if (marker.isValid()) {
        var pos = editor.getCursorBufferPosition();
        editor.setTextInBufferRange(marker.getBufferRange(), formattedtext);
        editor.scrollToBufferPosition(pos);
        editor.setCursorBufferPosition(pos);
      } else {
        atom.notifications.addError('Julia-Client: Format-Code', {
          description: 'Cancelled the formatting task because the selected code has been manually modified.',
          dismissable: true
        });
      }
    }
  })['catch'](function (err) {
    console.log(err);
  })['finally'](function () {
    marker.destroy();
  });
}

function markRange(editor, range) {
  var marker = editor.markBufferRange(range, {
    invalidate: 'inside'
  });
  editor.decorateMarker(marker, {
    type: 'highlight',
    'class': 'ink-block'
  });
  return marker;
}

var subs = undefined;

function activate() {
  subs = new _atom.CompositeDisposable();
  var edWatch = new WeakSet();

  subs.add(atom.workspace.observeTextEditors(function (ed) {
    edWatch.add(ed);
    // use onDidSave instead of onWillSave to guarantee our formatter is the last to run:
    var edsub = ed.getBuffer().onDidSave(function () {
      if (ed && ed.getGrammar && ed.getGrammar().id === 'source.julia') {
        if (_connection.client.isActive() && edWatch.has(ed)) {
          formatEditor(ed).then(function () {
            edWatch['delete'](ed);
            ed.save().then(function () {
              edWatch.add(ed);
            })['catch'](function (err) {
              console.log(err);
            });
          })['catch'](function (err) {
            console.log(err);
          });
        }
      }
    });
    subs.add(edsub);

    subs.add(ed.onDidDestroy(function () {
      edsub.dispose();
    }));
  }));
}

function deactivate() {
  subs && subs.dispose && subs.dispose();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NoaXZha3Jpc2huYWthcm5hdGkvLnZhci9hcHAvaW8uYXRvbS5BdG9tL2RhdGEvcGFja2FnZXMvanVsaWEtY2xpZW50L2xpYi9ydW50aW1lL2Zvcm1hdHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztvQkFFaUIsTUFBTTs7OzswQkFDQSxlQUFlOztvQkFDRixNQUFNOztBQUUxQyxJQUFNLE1BQU0sR0FBRyw0QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBOztBQUUvQixTQUFTLFVBQVUsR0FBSTtBQUM1QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUE7QUFDbkQsTUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFNOztBQUVuQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUE7QUFDekMsTUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUN2RCxnQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQ3JCLE1BQU07QUFDTCxjQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUyxFQUFLO0FBQ2hDLCtCQUF5QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUM3QyxDQUFDLENBQUE7R0FDSDtDQUNGOztBQUVELFNBQVMsWUFBWSxDQUFFLE1BQU0sRUFBRTtBQUM3QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDM0MsU0FBTyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0NBQ2hFOztBQUVELFNBQVMseUJBQXlCLENBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRTtBQUNyRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENB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QUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsS0FBSyxjQUFjLEVBQUU7QUFDaEUsWUFBSSxtQkFBTyxRQUFRLEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hDLHNCQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDMUIsbUJBQU8sVUFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ2xCLGNBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNuQixxQkFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNoQixDQUFDLFNBQU0sQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNkLHFCQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ2pCLENBQUMsQ0FBQTtXQUNILENBQUMsU0FBTSxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ2QsbUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7V0FDakIsQ0FBQyxDQUFBO1NBQ0g7T0FDRjtLQUNGLENBQUMsQ0FBQTtBQUNGLFFBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7O0FBRWYsUUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQU07QUFDN0IsV0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ2hCLENBQUMsQ0FBQyxDQUFBO0dBQ0osQ0FBQyxDQUFDLENBQUE7Q0FDSjs7QUFFTSxTQUFTLFVBQVUsR0FBRztBQUMzQixNQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7Q0FDdkMiLCJmaWxlIjoiL2hvbWUvc2hpdmFrcmlzaG5ha2FybmF0aS8udmFyL2FwcC9pby5hdG9tLkF0b20vZGF0YS9wYWNrYWdlcy9qdWxpYS1jbGllbnQvbGliL3J1bnRpbWUvZm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBiYWJlbCAqL1xuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vY29ubmVjdGlvbidcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tICdhdG9tJ1xuXG5jb25zdCBmb3JtYXQgPSBjbGllbnQuaW1wb3J0KCdmb3JtYXQnKVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q29kZSAoKSB7XG4gIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKVxuICBpZiAoIWVkaXRvcikgcmV0dXJuXG5cbiAgY29uc3Qgc2VsZWN0aW9ucyA9IGVkaXRvci5nZXRTZWxlY3Rpb25zKClcbiAgaWYgKHNlbGVjdGlvbnMubGVuZ3RoID09PSAxICYmICFzZWxlY3Rpb25zWzBdLmdldFRleHQoKSkge1xuICAgIGZvcm1hdEVkaXRvcihlZGl0b3IpXG4gIH0gZWxzZSB7XG4gICAgc2VsZWN0aW9ucy5mb3JFYWNoKChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGZvcm1hdEVkaXRvcldpdGhTZWxlY3Rpb24oZWRpdG9yLCBzZWxlY3Rpb24pXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBmb3JtYXRFZGl0b3IgKGVkaXRvcikge1xuICBjb25zdCByYW5nZSA9IGVkaXRvci5nZXRCdWZmZXIoKS5nZXRSYW5nZSgpXG4gIHJldHVybiBmb3JtYXRFZGl0b3JUZXh0SW5SYW5nZShlZGl0b3IsIHJhbmdlLCBlZGl0b3IuZ2V0VGV4dCgpKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRFZGl0b3JXaXRoU2VsZWN0aW9uIChlZGl0b3IsIHNlbGVjdGlvbikge1xuICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRCdWZmZXJSYW5nZSgpXG4gIHJldHVybiBmb3JtYXRFZGl0b3JUZXh0SW5SYW5nZShlZGl0b3IsIHJhbmdlLCBzZWxlY3Rpb24uZ2V0VGV4dCgpKVxufVxuXG5mdW5jdGlvbiBmb3JtYXRFZGl0b3JUZXh0SW5SYW5nZSAoZWRpdG9yLCByYW5nZSwgdGV4dCkge1xuICBjb25zdCBkaXIgPSBwYXRoLmRpcm5hbWUoY2xpZW50LmVkaXRvclBhdGgoZWRpdG9yKSlcbiAgY29uc3QgbWFya2VyID0gbWFya1JhbmdlKGVkaXRvciwgcmFuZ2UpXG4gIC8vIE5PVEU6IEJyYW5jaCBvbiBgZ2V0U29mdFRhYnNgIGlmIHN1cHBvcnRlZCBieSBmb3JtYXR0ZXIuXG4gIGNvbnN0IGluZGVudCA9IGVkaXRvci5nZXRUYWJMZW5ndGgoKVxuICBjb25zdCBtYXJnaW4gPSBlZGl0b3IuZ2V0UHJlZmVycmVkTGluZUxlbmd0aCgpXG4gIGZvcm1hdCh7XG4gICAgdGV4dCxcbiAgICBkaXIsXG4gICAgaW5kZW50LFxuICAgIG1hcmdpbixcbiAgfSkudGhlbigoeyBlcnJvciwgZm9ybWF0dGVkdGV4dCB9KSA9PiB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ0p1bGlhLUNsaWVudDogRm9ybWF0LUNvZGUnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBlcnJvcixcbiAgICAgICAgZGlzbWlzc2FibGU6IHRydWVcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtYXJrZXIuaXNWYWxpZCgpKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGVkaXRvci5nZXRDdXJzb3JCdWZmZXJQb3NpdGlvbigpXG4gICAgICAgIGVkaXRvci5zZXRUZXh0SW5CdWZmZXJSYW5nZShtYXJrZXIuZ2V0QnVmZmVyUmFuZ2UoKSwgZm9ybWF0dGVkdGV4dClcbiAgICAgICAgZWRpdG9yLnNjcm9sbFRvQnVmZmVyUG9zaXRpb24ocG9zKVxuICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24ocG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdKdWxpYS1DbGllbnQ6IEZvcm1hdC1Db2RlJywge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ2FuY2VsbGVkIHRoZSBmb3JtYXR0aW5nIHRhc2sgYmVjYXVzZSB0aGUgc2VsZWN0ZWQgY29kZSBoYXMgYmVlbiBtYW51YWxseSBtb2RpZmllZC4nLFxuICAgICAgICAgIGRpc21pc3NhYmxlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KS5jYXRjaChlcnIgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycilcbiAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgbWFya2VyLmRlc3Ryb3koKVxuICB9KVxufVxuXG5mdW5jdGlvbiBtYXJrUmFuZ2UoZWRpdG9yLCByYW5nZSkge1xuICBjb25zdCBtYXJrZXIgPSBlZGl0b3IubWFya0J1ZmZlclJhbmdlKHJhbmdlLCB7XG4gICAgaW52YWxpZGF0ZTogJ2luc2lkZSdcbiAgfSlcbiAgZWRpdG9yLmRlY29yYXRlTWFya2VyKG1hcmtlciwge1xuICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgIGNsYXNzOiAnaW5rLWJsb2NrJ1xuICB9KVxuICByZXR1cm4gbWFya2VyXG59XG5cbmxldCBzdWJzXG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgc3VicyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcbiAgY29uc3QgZWRXYXRjaCA9IG5ldyBXZWFrU2V0KClcblxuICBzdWJzLmFkZChhdG9tLndvcmtzcGFjZS5vYnNlcnZlVGV4dEVkaXRvcnMoZWQgPT4ge1xuICAgIGVkV2F0Y2guYWRkKGVkKVxuICAgIC8vIHVzZSBvbkRpZFNhdmUgaW5zdGVhZCBvZiBvbldpbGxTYXZlIHRvIGd1YXJhbnRlZSBvdXIgZm9ybWF0dGVyIGlzIHRoZSBsYXN0IHRvIHJ1bjpcbiAgICBjb25zdCBlZHN1YiA9IGVkLmdldEJ1ZmZlcigpLm9uRGlkU2F2ZSgoKSA9PiB7XG4gICAgICBpZiAoZWQgJiYgZWQuZ2V0R3JhbW1hciAmJiBlZC5nZXRHcmFtbWFyKCkuaWQgPT09ICdzb3VyY2UuanVsaWEnKSB7XG4gICAgICAgIGlmIChjbGllbnQuaXNBY3RpdmUoKSAmJiBlZFdhdGNoLmhhcyhlZCkpIHtcbiAgICAgICAgICBmb3JtYXRFZGl0b3IoZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZWRXYXRjaC5kZWxldGUoZWQpXG4gICAgICAgICAgICBlZC5zYXZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGVkV2F0Y2guYWRkKGVkKVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIHN1YnMuYWRkKGVkc3ViKVxuXG4gICAgc3Vicy5hZGQoZWQub25EaWREZXN0cm95KCgpID0+IHtcbiAgICAgIGVkc3ViLmRpc3Bvc2UoKVxuICAgIH0pKVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoKSB7XG4gIHN1YnMgJiYgc3Vicy5kaXNwb3NlICYmIHN1YnMuZGlzcG9zZSgpXG59XG4iXX0=