
function GithubComparison(repos) {
    var fields = ["description", "language", "watchers", "forks", "updated_at", "created_at"],
        data = [],
        callbacks = [];

    function ajax(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data.push(JSON.parse(xhr.responseText));
                if (data.length >= repos.length) {
                    finalize();
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    function finalize() {
        data.sort(function(a, b) {
            return b.watchers - a.watchers;
        });
        for (var i = 0; i < callbacks.length; i+=1) {
            callbacks[i](data);
        }
    }

    function doRender(data) {
        var table = document.createElement('table'),
            thead = document.createElement('thead'),
            tbody = document.createElement('tbody'),
            row = document.createElement('tr'),
            entry = null,
            i, j;

        entry = document.createElement('th');
        entry.innerText = 'Repository';
        row.appendChild(entry);
        for (j = 0; j < fields.length; j+=1) {
            entry = document.createElement('th');
            entry.innerText = fields[j];
            row.appendChild(entry);
        }
        thead.appendChild(row);

        for (i = 0; i < data.length; i+=1) {
            row = document.createElement('tr');
            entry = document.createElement('td');
            entry.innerHTML = '<a href="'+data[i].html_url+'">'+data[i].full_name+'</a>';
            row.appendChild(entry);
            for (j = 0; j < fields.length; j+=1) {
                entry = document.createElement('td');
                var d = data[i][fields[j]];
                if (fields[j].match(/_at$/)) {
                   d = new Date(d);
                   d = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                }
                entry.innerText = d;
                row.appendChild(entry);
            }
            tbody.appendChild(row);
        }
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    function render(fn) {
        if (typeof fn === 'string') {
            var selector = fn;
            fn = function(data) {
                var el = document.querySelector(selector);
                el.innerHTML = '';
                el.appendChild(data);
            };
        }
        return json(function(data) {
            fn(doRender(data));
        });
    }

    function json(fn) {
        callbacks.push(fn);
        return self;
    }

    setTimeout(function() {
        for (var i = 0; i < repos.length; i+=1) {
            ajax('https://api.github.com/repos/'+repos[i].replace(/^https?:\/\/github.com\//, ''));
        }
    }, 0);

    var self = {
        repos: repos,
        render: render,
        json: json
    };
    return self;
}
