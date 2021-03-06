
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Write your app here.

    require('layouts/view');
    require('layouts/list');

    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // Match a Youtube url pattern
    var YOUTUBE =/youtube\.com(?:\/#)?\/watch\?v=([A-Z0-9-_]+)|youtu\.be\/([A-Z0-9-_]+)/i; 

    function generateVideo(url) {
        var youtubeMatch = url.match(YOUTUBE);
        // If a url pattern is matched, return the iframe - otherwise, return the string
        if (youtubeMatch) {
          var youtubeId = youtubeMatch[1]?youtubeMatch[1]:youtubeMatch[2]; 
          url = '<div class="video-wrapper"><iframe width="560" height="349" ' +
                'src="http://www.youtube.com/embed/' + youtubeId +
                '?wmode=transparent&webm=1" frameborder="0" allowfullscreen></iframe></div>'
        }
        return (url);
    }

    // List view

    var list = $('.list').get(0);
    /*
    list.add({ title: 'Learn this template',
               desc: 'This is a list-detail template. Learn more ' +
                     'about it at its ' +
                     '<a href="https://github.com/mozilla/mortar-list-detail">project page!</a>',
               date: new Date() });
    list.add({ title: 'Make things',
               desc: 'Make this look like that',
               date: new Date(12, 9, 5) });
    list.add({ title: 'Move stuff',
               desc: 'Move this over there',
               date: new Date(12, 10, 1) });
    */

    $('button.refresh', list).click(function() {
        // Do nothing right now
    });

    $('button.add', list).click(function() {
        edit.open(null, 'slideLeft');
    });

    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(generateVideo(item.get('title')));
        $('.desc', this).html(item.get('desc'));
        $('.date', this).text(formatDate(item.get('date')));
    };

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close('slideRightOut');
    });
});
