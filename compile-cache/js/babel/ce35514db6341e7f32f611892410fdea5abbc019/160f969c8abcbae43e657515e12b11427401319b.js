Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.activate = activate;
exports.open = open;
exports.close = close;
exports.deactivate = deactivate;

var _atom = require('atom');

var _connection = require('../connection');

'use babel';

var subs = undefined,
    lintPane = undefined;

function activate(ink) {
  var linter = ink.Linter;
  lintPane = linter.lintPane;

  _connection.client.handle({
    staticLint: function staticLint(warnings) {
      lintPane.ensureVisible({
        split: atom.config.get('julia-client.uiOptions.layouts.linter.split')
      });
      linter.setItems(warnings);
    }
  });

  subs = new _atom.CompositeDisposable();

  subs.add(atom.commands.add('.workspace', {
    'julia-client:clear-linter': function juliaClientClearLinter() {
      return linter.clearItems();
    }
  }));
  subs.add(atom.config.observe('julia-client.uiOptions.layouts.linter.defaultLocation', function (defaultLocation) {
    lintPane.setDefaultLocation(defaultLocation);
  }));
}

function open() {
  return lintPane.open({
    split: atom.config.get('julia-client.uiOptions.layouts.linter.split')
  });
}

function close() {
  return lintPane.close();
}

function deactivate() {
  if (subs) {
    subs.dispose();
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3NoaXZha3Jpc2huYWthcm5hdGkvLnZhci9hcHAvaW8uYXRvbS5BdG9tL2RhdGEvcGFja2FnZXMvanVsaWEtY2xpZW50L2xpYi9ydW50aW1lL2xpbnRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFFb0MsTUFBTTs7MEJBQ25CLGVBQWU7O0FBSHRDLFdBQVcsQ0FBQTs7QUFLWCxJQUFJLElBQUksWUFBQTtJQUFFLFFBQVEsWUFBQSxDQUFBOztBQUVYLFNBQVMsUUFBUSxDQUFFLEdBQUcsRUFBRTtBQUM3QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO0FBQ3pCLFVBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBOztBQUUxQixxQkFBTyxNQUFNLENBQUM7QUFDWixjQUFVLEVBQUUsb0JBQUMsUUFBUSxFQUFLO0FBQ3hCLGNBQVEsQ0FBQyxhQUFhLENBQUM7QUFDckIsYUFBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDO09BQ3RFLENBQUMsQ0FBQTtBQUNGLFlBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDMUI7R0FDRixDQUFDLENBQUE7O0FBRUYsTUFBSSxHQUFHLCtCQUF5QixDQUFBOztBQUVoQyxNQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtBQUN2QywrQkFBMkIsRUFBRTthQUFNLE1BQU0sQ0FBQyxVQUFVLEVBQUU7S0FBQTtHQUN2RCxDQUFDLENBQUMsQ0FBQTtBQUNILE1BQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsdURBQXVELEVBQUUsVUFBQyxlQUFlLEVBQUs7QUFDekcsWUFBUSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFBO0dBQzdDLENBQUMsQ0FBQyxDQUFBO0NBQ0o7O0FBRU0sU0FBUyxJQUFJLEdBQUk7QUFDdEIsU0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ25CLFNBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBQztHQUN0RSxDQUFDLENBQUE7Q0FDSDs7QUFFTSxTQUFTLEtBQUssR0FBSTtBQUN2QixTQUFPLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtDQUN4Qjs7QUFFTSxTQUFTLFVBQVUsR0FBSTtBQUM1QixNQUFJLElBQUksRUFBRTtBQUNSLFFBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtHQUNmO0NBQ0YiLCJmaWxlIjoiL2hvbWUvc2hpdmFrcmlzaG5ha2FybmF0aS8udmFyL2FwcC9pby5hdG9tLkF0b20vZGF0YS9wYWNrYWdlcy9qdWxpYS1jbGllbnQvbGliL3J1bnRpbWUvbGludGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9jb25uZWN0aW9uJ1xuXG5sZXQgc3VicywgbGludFBhbmVcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlIChpbmspIHtcbiAgY29uc3QgbGludGVyID0gaW5rLkxpbnRlclxuICBsaW50UGFuZSA9IGxpbnRlci5saW50UGFuZVxuXG4gIGNsaWVudC5oYW5kbGUoe1xuICAgIHN0YXRpY0xpbnQ6ICh3YXJuaW5ncykgPT4ge1xuICAgICAgbGludFBhbmUuZW5zdXJlVmlzaWJsZSh7XG4gICAgICAgIHNwbGl0OiBhdG9tLmNvbmZpZy5nZXQoJ2p1bGlhLWNsaWVudC51aU9wdGlvbnMubGF5b3V0cy5saW50ZXIuc3BsaXQnKVxuICAgICAgfSlcbiAgICAgIGxpbnRlci5zZXRJdGVtcyh3YXJuaW5ncylcbiAgICB9XG4gIH0pXG5cbiAgc3VicyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBzdWJzLmFkZChhdG9tLmNvbW1hbmRzLmFkZCgnLndvcmtzcGFjZScsIHtcbiAgICAnanVsaWEtY2xpZW50OmNsZWFyLWxpbnRlcic6ICgpID0+IGxpbnRlci5jbGVhckl0ZW1zKClcbiAgfSkpXG4gIHN1YnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2p1bGlhLWNsaWVudC51aU9wdGlvbnMubGF5b3V0cy5saW50ZXIuZGVmYXVsdExvY2F0aW9uJywgKGRlZmF1bHRMb2NhdGlvbikgPT4ge1xuICAgIGxpbnRQYW5lLnNldERlZmF1bHRMb2NhdGlvbihkZWZhdWx0TG9jYXRpb24pXG4gIH0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbiAoKSB7XG4gIHJldHVybiBsaW50UGFuZS5vcGVuKHtcbiAgICBzcGxpdDogYXRvbS5jb25maWcuZ2V0KCdqdWxpYS1jbGllbnQudWlPcHRpb25zLmxheW91dHMubGludGVyLnNwbGl0JylcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgcmV0dXJuIGxpbnRQYW5lLmNsb3NlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUgKCkge1xuICBpZiAoc3Vicykge1xuICAgIHN1YnMuZGlzcG9zZSgpXG4gIH1cbn1cbiJdfQ==