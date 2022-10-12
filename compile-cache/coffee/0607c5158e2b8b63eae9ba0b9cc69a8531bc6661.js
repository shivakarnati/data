(function() {
  module.exports = {
    deactivate: function() {
      var ref;
      return (ref = this.toolBar) != null ? ref.removeItems() : void 0;
    },
    consumeToolBar: function(toolBar) {
      var btn;
      this.toolBar = toolBar('handy-tool-bar');
      this.toolBar.addSpacer();
      this.toolBar.addButton({
        callback: 'application:open-file',
        icon: 'file-text',
        iconset: 'icomoon',
        tooltip: 'Open File'
      });
      this.toolBar.addButton({
        'callback': 'application:open-folder',
        'icon': 'folder-open',
        'iconset': 'icomoon',
        'tooltip': 'Open Folder'
      });
      if (atom.packages.loadedPackages['project-manager']) {
        this.toolBar.addButton({
          'icon': 'file-submodule',
          'tooltip': 'List projects',
          'callback': 'project-manager:list-projects'
        });
      }
      this.toolBar.addSpacer();
      this.toolBar.addButton({
        'callback': 'pane:split-right',
        'icon': 'columns',
        'iconset': 'fa',
        'tooltip': 'Split Right'
      });
      btn = this.toolBar.addButton({
        'callback': 'pane:split-down',
        'icon': 'columns',
        'iconset': 'fa',
        'tooltip': 'Split Down'
      });
      btn.element.classList.add('fa-rotate-270');
      this.toolBar.addSpacer();
      this.toolBar.addButton({
        'callback': 'window:toggle-full-screen',
        'icon': 'screen-full',
        'tooltip': 'Toggle Fullscreen'
      });
      this.toolBar.addButton({
        'callback': 'tree-view:toggle',
        'icon': 'move-down',
        'iconset': 'icomoon',
        'tooltip': 'Toggle Sidebar'
      });
      if (atom.packages.loadedPackages['minimap']) {
        this.toolBar.addButton({
          'callback': 'minimap:toggle',
          'icon': 'map-marker-alt',
          'iconset': 'fa',
          'tooltip': 'Toggle Minimap'
        });
      }
      if (atom.packages.loadedPackages['expose']) {
        this.toolBar.addButton({
          'callback': 'expose:toggle',
          'icon': 'window-restore',
          'iconset': 'fa',
          'tooltip': 'Toggle Exposé'
        });
      }
      this.toolBar.addSpacer();
      this.toolBar.addButton({
        'callback': 'editor:auto-indent',
        'icon': 'indent',
        'iconset': 'fa',
        'tooltip': 'Auto indent (selection)'
      });
      this.toolBar.addButton({
        'callback': 'editor:unfold-all',
        'icon': 'level-down-alt',
        'iconset': 'fa',
        'tooltip': 'Unfold all blocks'
      });
      if (atom.packages.loadedPackages['atom-beautify']) {
        this.toolBar.addButton({
          'callback': 'atom-beautify:beautify-editor',
          'icon': 'star',
          'iconset': 'fa',
          'tooltip': 'Beautify code'
        });
      }
      if (atom.packages.loadedPackages['terminal-plus']) {
        this.toolBar.addSpacer();
        this.toolBar.addButton({
          'callback': 'terminal-plus:toggle',
          'icon': 'terminal',
          'tooltip': 'Toggle Terminal-plus'
        });
      }
      if (atom.inDevMode()) {
        this.toolBar.addButton({
          'callback': 'window:reload',
          'icon': 'redo',
          'iconset': 'fa',
          'tooltip': 'Reload Window'
        });
        this.toolBar.addButton({
          'callback': 'window:toggle-dev-tools',
          'icon': 'tools',
          'tooltip': 'Toggle Developer Tools'
        });
      }
      if (atom.packages.loadedPackages['git-plus']) {
        this.toolBar.addSpacer();
        this.toolBar.addButton({
          'callback': 'git-plus:menu',
          'icon': 'git-plain',
          'iconset': 'devicon',
          'tooltip': 'Git plus'
        });
      }
      if (atom.packages.loadedPackages['script']) {
        this.toolBar.addSpacer();
        this.toolBar.addButton({
          'callback': 'script:run',
          'icon': 'play',
          'iconset': 'fa',
          'tooltip': 'Run script'
        });
        this.toolBar.addButton({
          'callback': 'script:kill-process',
          'icon': 'stop',
          'iconset': 'fa',
          'tooltip': 'Stop script'
        });
        this.toolBar.addButton({
          'callback': 'script:run-options',
          'icon': 'cogs',
          'iconset': 'fa',
          'tooltip': 'Configure script'
        });
      }
      this.toolBar.addSpacer();
      if (atom.packages.loadedPackages['markdown-preview-plus']) {
        this.toolBar.addButton({
          'callback': 'markdown-preview-plus:toggle',
          'icon': 'markdown',
          'tooltip': 'Markdown Preview'
        });
      } else {
        this.toolBar.addButton({
          'callback': 'markdown-preview:toggle',
          'icon': 'markdown',
          'tooltip': 'Markdown Preview'
        });
      }
      if (atom.packages.loadedPackages['atom-html-preview']) {
        this.toolBar.addButton({
          'callback': 'atom-html-preview:toggle',
          'icon': 'logo-html5',
          'iconset': 'ion',
          'tooltip': 'HTML Preview'
        });
      }
      if (atom.packages.loadedPackages['atom-live-server']) {
        this.toolBar.addButton({
          'callback': 'atom-live-server:start-3000',
          'icon': 'sync',
          'tooltip': 'HTML Live Server'
        });
      }
      this.toolBar.addSpacer();
      return this.toolBar.addButton({
        'callback': 'command-palette:toggle',
        'icon': 'palette',
        'iconset': 'fa',
        'tooltip': 'Toggle Command Palette'
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvc2hpdmFrcmlzaG5ha2FybmF0aS8udmFyL2FwcC9pby5hdG9tLkF0b20vZGF0YS9wYWNrYWdlcy9oYW5keS10b29sLWJhci9saWIvaGFuZHktdG9vbC1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRCQTtFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxVQUFBLEVBQVksU0FBQTtBQUNWLFVBQUE7K0NBQVEsQ0FBRSxXQUFWLENBQUE7SUFEVSxDQUFaO0lBR0EsY0FBQSxFQUFnQixTQUFDLE9BQUQ7QUFDZCxVQUFBO01BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxPQUFBLENBQVEsZ0JBQVI7TUFFWCxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsQ0FBQTtNQVFBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUNFO1FBQUEsUUFBQSxFQUFVLHVCQUFWO1FBQ0EsSUFBQSxFQUFNLFdBRE47UUFFQSxPQUFBLEVBQVMsU0FGVDtRQUdBLE9BQUEsRUFBUyxXQUhUO09BREY7TUFNQSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsQ0FDRTtRQUFBLFVBQUEsRUFBWSx5QkFBWjtRQUNBLE1BQUEsRUFBUSxhQURSO1FBRUEsU0FBQSxFQUFXLFNBRlg7UUFHQSxTQUFBLEVBQVcsYUFIWDtPQURGO01BWUEsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWUsQ0FBQSxpQkFBQSxDQUFoQztRQUNFLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUNFO1VBQUEsTUFBQSxFQUFRLGdCQUFSO1VBQ0EsU0FBQSxFQUFXLGVBRFg7VUFFQSxVQUFBLEVBQVksK0JBRlo7U0FERixFQURGOztNQWNBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUFBO01BRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQ0U7UUFBQSxVQUFBLEVBQVksa0JBQVo7UUFDQSxNQUFBLEVBQVEsU0FEUjtRQUVB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LFVBRFI7VUFFQSxTQUFBLEVBQVcsa0JBRlg7U0FERixFQU5GOztNQVdBLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFlLENBQUEsbUJBQUEsQ0FBaEM7UUFDRSxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsQ0FDRTtVQUFBLFVBQUEsRUFBWSwwQkFBWjtVQUNBLE1BQUEsRUFBUSxZQURSO1VBRUEsU0FBQSxFQUFXLEtBRlg7VUFHQSxTQUFBLEVBQVcsY0FIWDtTQURGLEVBREY7O01BT0EsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWUsQ0FBQSxrQkFBQSxDQUFoQztRQUNFLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUNFO1VBQUEsVUFBQSxFQUFZLDZCQUFaO1VBQ0EsTUFBQSxFQUFRLE1BRFI7VUFFQSxTQUFBLEVBQVcsa0JBRlg7U0FERixFQURGOztNQWNBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUFBO2FBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQ0U7UUFBQSxVQUFBLEVBQVksd0JBQVo7UUFDQSxNQUFBLEVBQVEsU0FEUjtRQUVBLFNBQUEsRUFBVyxJQUZYO1FBR0EsU0FBQSxFQUFXLHdCQUhYO09BREY7SUFyTmMsQ0FIaEI7O0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyIjIENvcHlyaWdodCAoYykgMjAyMCA8RGllZ28gTWFyacOxbz5cbiNcbiMgTUlUIExpY2Vuc2VcbiNcbiMgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nXG4jIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuIyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbiMgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuIyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbiMgcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4jIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiNcbiMgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiMgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4jXG4jIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4jIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuIyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORFxuIyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4jIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT05cbiMgT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OXG4jIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgVGhpcyBpcyBhIGZvcmsgZnJvbSBodHRwczovL2F0b20uaW8vcGFja2FnZXMvdG9vbC1iYXItYmFzaWNcbiMgSSd2ZSBsZWZ0IHNvbWUgb2YgdGhlIG9yaWdpbmFsIGJ1dHRvbnMgY29tbWVudGVkIGJlbG93IGluIGNhc2UgdGhleSBhcmUgdXNlZnVsXG4jIGZvciB5b3VyIHdvcmtmbG93XG4jIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHRvb2xCYXI/LnJlbW92ZUl0ZW1zKClcblxuICBjb25zdW1lVG9vbEJhcjogKHRvb2xCYXIpIC0+XG4gICAgQHRvb2xCYXIgPSB0b29sQmFyICdoYW5keS10b29sLWJhcidcblxuICAgIEB0b29sQmFyLmFkZFNwYWNlcigpXG5cbiAgICAjIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICMgICBpY29uOiAnZmlsZS1lbXB0eSdcbiAgICAjICAgY2FsbGJhY2s6ICdhcHBsaWNhdGlvbjpuZXctZmlsZSdcbiAgICAjICAgdG9vbHRpcDogJ05ldyBGaWxlJ1xuICAgICMgICBpY29uc2V0OiAnaWNvbW9vbidcblxuICAgIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICAgY2FsbGJhY2s6ICdhcHBsaWNhdGlvbjpvcGVuLWZpbGUnXG4gICAgICBpY29uOiAnZmlsZS10ZXh0J1xuICAgICAgaWNvbnNldDogJ2ljb21vb24nXG4gICAgICB0b29sdGlwOiAnT3BlbiBGaWxlJ1xuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAnYXBwbGljYXRpb246b3Blbi1mb2xkZXInXG4gICAgICAnaWNvbic6ICdmb2xkZXItb3BlbidcbiAgICAgICdpY29uc2V0JzogJ2ljb21vb24nXG4gICAgICAndG9vbHRpcCc6ICdPcGVuIEZvbGRlcidcblxuICAgICMgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgIyAgICdpY29uJzogJ2Zsb3BweS1kaXNrJ1xuICAgICMgICAnY2FsbGJhY2snOiAnY29yZTpzYXZlJ1xuICAgICMgICAndG9vbHRpcCc6ICdTYXZlIEZpbGUnXG4gICAgIyAgICdpY29uc2V0JzogJ2ljb21vb24nXG5cbiAgICBpZiBhdG9tLnBhY2thZ2VzLmxvYWRlZFBhY2thZ2VzWydwcm9qZWN0LW1hbmFnZXInXVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdpY29uJzogJ2ZpbGUtc3VibW9kdWxlJ1xuICAgICAgICAndG9vbHRpcCc6ICdMaXN0IHByb2plY3RzJ1xuICAgICAgICAnY2FsbGJhY2snOiAncHJvamVjdC1tYW5hZ2VyOmxpc3QtcHJvamVjdHMnXG5cbiAgICAjIEB0b29sQmFyLmFkZFNwYWNlcigpXG4gICAgI1xuICAgICMgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgIyAgICdpY29uJzogJ3NlYXJjaCdcbiAgICAjICAgJ2ljb25zZXQnOiAnZmEnXG4gICAgIyAgICd0b29sdGlwJzogJ0ZpbmQgaW4gQnVmZmVyJ1xuICAgICMgICAnY2FsbGJhY2snOiAnZmluZC1hbmQtcmVwbGFjZTp0b2dnbGUnXG5cbiAgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAncGFuZTpzcGxpdC1yaWdodCdcbiAgICAgICdpY29uJzogJ2NvbHVtbnMnXG4gICAgICAnaWNvbnNldCc6ICdmYSdcbiAgICAgICd0b29sdGlwJzogJ1NwbGl0IFJpZ2h0J1xuXG4gICAgYnRuID0gQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAncGFuZTpzcGxpdC1kb3duJ1xuICAgICAgJ2ljb24nOiAnY29sdW1ucydcbiAgICAgICdpY29uc2V0JzogJ2ZhJ1xuICAgICAgJ3Rvb2x0aXAnOiAnU3BsaXQgRG93bidcbiAgICBidG4uZWxlbWVudC5jbGFzc0xpc3QuYWRkICdmYS1yb3RhdGUtMjcwJ1xuXG4gICAgQHRvb2xCYXIuYWRkU3BhY2VyKClcblxuICAgIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICAgJ2NhbGxiYWNrJzogJ3dpbmRvdzp0b2dnbGUtZnVsbC1zY3JlZW4nXG4gICAgICAnaWNvbic6ICdzY3JlZW4tZnVsbCdcbiAgICAgICd0b29sdGlwJzogJ1RvZ2dsZSBGdWxsc2NyZWVuJ1xuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAndHJlZS12aWV3OnRvZ2dsZSdcbiAgICAgICdpY29uJzogJ21vdmUtZG93bidcbiAgICAgICdpY29uc2V0JzogJ2ljb21vb24nXG4gICAgICAndG9vbHRpcCc6ICdUb2dnbGUgU2lkZWJhcidcblxuICAgIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ21pbmltYXAnXVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICdtaW5pbWFwOnRvZ2dsZSdcbiAgICAgICAgJ2ljb24nOiAnbWFwLW1hcmtlci1hbHQnXG4gICAgICAgICdpY29uc2V0JzogJ2ZhJ1xuICAgICAgICAndG9vbHRpcCc6ICdUb2dnbGUgTWluaW1hcCdcblxuICAgIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ2V4cG9zZSddXG4gICAgICBAdG9vbEJhci5hZGRCdXR0b25cbiAgICAgICAgJ2NhbGxiYWNrJzogJ2V4cG9zZTp0b2dnbGUnXG4gICAgICAgICdpY29uJzogJ3dpbmRvdy1yZXN0b3JlJ1xuICAgICAgICAnaWNvbnNldCc6ICdmYSdcbiAgICAgICAgJ3Rvb2x0aXAnOiAnVG9nZ2xlIEV4cG9zw6knXG5cbiAgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAnZWRpdG9yOmF1dG8taW5kZW50J1xuICAgICAgJ2ljb24nOiAnaW5kZW50J1xuICAgICAgJ2ljb25zZXQnOiAnZmEnXG4gICAgICAndG9vbHRpcCc6ICdBdXRvIGluZGVudCAoc2VsZWN0aW9uKSdcblxuICAgICMgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgIyAgICdpY29uJzogJ2xldmVsLXVwLWFsdCdcbiAgICAjICAgJ2NhbGxiYWNrJzogJ2VkaXRvcjpmb2xkLWFsbCdcbiAgICAjICAgJ3Rvb2x0aXAnOiAnRm9sZCBhbGwnXG4gICAgIyAgICdpY29uc2V0JzogJ2ZhJ1xuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAnZWRpdG9yOnVuZm9sZC1hbGwnXG4gICAgICAnaWNvbic6ICdsZXZlbC1kb3duLWFsdCdcbiAgICAgICdpY29uc2V0JzogJ2ZhJ1xuICAgICAgJ3Rvb2x0aXAnOiAnVW5mb2xkIGFsbCBibG9ja3MnXG5cblxuICAgIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ2F0b20tYmVhdXRpZnknXVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICdhdG9tLWJlYXV0aWZ5OmJlYXV0aWZ5LWVkaXRvcidcbiAgICAgICAgJ2ljb24nOiAnc3RhcidcbiAgICAgICAgJ2ljb25zZXQnOiAnZmEnXG4gICAgICAgICd0b29sdGlwJzogJ0JlYXV0aWZ5IGNvZGUnXG5cbiAgICBpZiBhdG9tLnBhY2thZ2VzLmxvYWRlZFBhY2thZ2VzWyd0ZXJtaW5hbC1wbHVzJ11cbiAgICAgIEB0b29sQmFyLmFkZFNwYWNlcigpXG4gICAgICBAdG9vbEJhci5hZGRCdXR0b25cbiAgICAgICAgJ2NhbGxiYWNrJzogJ3Rlcm1pbmFsLXBsdXM6dG9nZ2xlJ1xuICAgICAgICAnaWNvbic6ICd0ZXJtaW5hbCdcbiAgICAgICAgJ3Rvb2x0aXAnOiAnVG9nZ2xlIFRlcm1pbmFsLXBsdXMnXG5cbiAgICAjIGVsc2UgaWYgYXRvbS5wYWNrYWdlcy5sb2FkZWRQYWNrYWdlc1sndGVybTInXVxuICAgICMgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuICAgICMgICBAdG9vbEJhci5hZGRCdXR0b25cbiAgICAjICAgICAnaWNvbic6ICd0ZXJtaW5hbCdcbiAgICAjICAgICAnY2FsbGJhY2snOiAndGVybTI6b3Blbi1zcGxpdC1kb3duJ1xuICAgICMgICAgICd0b29sdGlwJzogJ1Rlcm0yIFNwbGl0IERvd24nXG4gICAgIyBlbHNlIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ3Rlcm0zJ11cbiAgICAjICAgQHRvb2xCYXIuYWRkU3BhY2VyKClcbiAgICAjICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgIyAgICAgJ2ljb24nOiAndGVybWluYWwnXG4gICAgIyAgICAgJ2NhbGxiYWNrJzogJ3Rlcm0zOm9wZW4tc3BsaXQtZG93bidcbiAgICAjICAgICAndG9vbHRpcCc6ICdUZXJtMyBTcGxpdCBEb3duJ1xuICAgICMgZWxzZSBpZiBhdG9tLnBhY2thZ2VzLmxvYWRlZFBhY2thZ2VzWydwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCddXG4gICAgIyAgIEB0b29sQmFyLmFkZFNwYWNlcigpXG4gICAgIyAgIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICMgICAgICdpY29uJzogJ3Rlcm1pbmFsJ1xuICAgICMgICAgICdjYWxsYmFjayc6ICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDp0b2dnbGUnXG4gICAgIyAgICAgJ3Rvb2x0aXAnOiAnVG9nZ2xlIHBsYXRmb3JtaW8taWRlLXRlcm1pbmFsJ1xuXG4gICAgaWYgYXRvbS5pbkRldk1vZGUoKVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICd3aW5kb3c6cmVsb2FkJ1xuICAgICAgICAnaWNvbic6ICdyZWRvJ1xuICAgICAgICAnaWNvbnNldCc6ICdmYSdcbiAgICAgICAgJ3Rvb2x0aXAnOiAnUmVsb2FkIFdpbmRvdydcblxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICd3aW5kb3c6dG9nZ2xlLWRldi10b29scydcbiAgICAgICAgJ2ljb24nOiAndG9vbHMnXG4gICAgICAgICd0b29sdGlwJzogJ1RvZ2dsZSBEZXZlbG9wZXIgVG9vbHMnXG5cbiAgICBpZiBhdG9tLnBhY2thZ2VzLmxvYWRlZFBhY2thZ2VzWydnaXQtcGx1cyddXG4gICAgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjaycgOiAnZ2l0LXBsdXM6bWVudSdcbiAgICAgICAgJ2ljb24nIDogJ2dpdC1wbGFpbidcbiAgICAgICAgJ2ljb25zZXQnIDogJ2Rldmljb24nXG4gICAgICAgICd0b29sdGlwJyA6ICdHaXQgcGx1cydcblxuICAgIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ3NjcmlwdCddXG4gICAgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICdzY3JpcHQ6cnVuJ1xuICAgICAgICAnaWNvbic6ICdwbGF5J1xuICAgICAgICAnaWNvbnNldCc6ICdmYSdcbiAgICAgICAgJ3Rvb2x0aXAnOiAnUnVuIHNjcmlwdCdcbiAgICAgIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICAgICAnY2FsbGJhY2snOiAnc2NyaXB0OmtpbGwtcHJvY2VzcydcbiAgICAgICAgJ2ljb24nOiAnc3RvcCdcbiAgICAgICAgJ2ljb25zZXQnOiAnZmEnXG4gICAgICAgICd0b29sdGlwJzogJ1N0b3Agc2NyaXB0J1xuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICdzY3JpcHQ6cnVuLW9wdGlvbnMnXG4gICAgICAgICdpY29uJzogJ2NvZ3MnXG4gICAgICAgICdpY29uc2V0JzogJ2ZhJ1xuICAgICAgICAndG9vbHRpcCc6ICdDb25maWd1cmUgc2NyaXB0J1xuXG4gICAgQHRvb2xCYXIuYWRkU3BhY2VyKClcblxuICAgIGlmIGF0b20ucGFja2FnZXMubG9hZGVkUGFja2FnZXNbJ21hcmtkb3duLXByZXZpZXctcGx1cyddXG4gICAgICBAdG9vbEJhci5hZGRCdXR0b25cbiAgICAgICAgJ2NhbGxiYWNrJzogJ21hcmtkb3duLXByZXZpZXctcGx1czp0b2dnbGUnXG4gICAgICAgICdpY29uJzogJ21hcmtkb3duJ1xuICAgICAgICAndG9vbHRpcCc6ICdNYXJrZG93biBQcmV2aWV3J1xuICAgIGVsc2VcbiAgICAgIEB0b29sQmFyLmFkZEJ1dHRvblxuICAgICAgICAnY2FsbGJhY2snOiAnbWFya2Rvd24tcHJldmlldzp0b2dnbGUnXG4gICAgICAgICdpY29uJzogJ21hcmtkb3duJ1xuICAgICAgICAndG9vbHRpcCc6ICdNYXJrZG93biBQcmV2aWV3J1xuXG4gICAgaWYgYXRvbS5wYWNrYWdlcy5sb2FkZWRQYWNrYWdlc1snYXRvbS1odG1sLXByZXZpZXcnXVxuICAgICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAgICdjYWxsYmFjayc6ICdhdG9tLWh0bWwtcHJldmlldzp0b2dnbGUnXG4gICAgICAgICdpY29uJzogJ2xvZ28taHRtbDUnXG4gICAgICAgICdpY29uc2V0JzogJ2lvbidcbiAgICAgICAgJ3Rvb2x0aXAnOiAnSFRNTCBQcmV2aWV3J1xuXG4gICAgaWYgYXRvbS5wYWNrYWdlcy5sb2FkZWRQYWNrYWdlc1snYXRvbS1saXZlLXNlcnZlciddXG4gICAgICBAdG9vbEJhci5hZGRCdXR0b25cbiAgICAgICAgJ2NhbGxiYWNrJzogJ2F0b20tbGl2ZS1zZXJ2ZXI6c3RhcnQtMzAwMCdcbiAgICAgICAgJ2ljb24nOiAnc3luYydcbiAgICAgICAgJ3Rvb2x0aXAnOiAnSFRNTCBMaXZlIFNlcnZlcidcblxuICAgICMgQHRvb2xCYXIuYWRkU3BhY2VyKClcbiAgI1xuICAgICMgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgIyAgICdpY29uJzogJ2NvZGUtYnJhbmNoJ1xuICAgICMgICAnY2FsbGJhY2snOiAnZ2l0aHViOnRvZ2dsZS1naXRodWItdGFiJ1xuICAgICMgICAndG9vbHRpcCc6ICdUb2dnbGUgR2l0SHViIFRhYidcbiAgICAjICAgJ2ljb25zZXQnOiAnZmEnXG5cbiAgICBAdG9vbEJhci5hZGRTcGFjZXIoKVxuXG4gICAgQHRvb2xCYXIuYWRkQnV0dG9uXG4gICAgICAnY2FsbGJhY2snOiAnY29tbWFuZC1wYWxldHRlOnRvZ2dsZSdcbiAgICAgICdpY29uJzogJ3BhbGV0dGUnXG4gICAgICAnaWNvbnNldCc6ICdmYSdcbiAgICAgICd0b29sdGlwJzogJ1RvZ2dsZSBDb21tYW5kIFBhbGV0dGUnXG4iXX0=
