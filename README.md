
# Github Comparison

Show comparison of github repos in a table with this simple javascript component.

See demo at (http://dundalek.com/github-comparison/).

## Usage

Include javascript file into the page (there are no other dependencies):
```html
<script type="text/javascript" src="github-comparison.min.js"></script>
```

```javascript

var repos = ['isaacs/npm', 'https://github.com/bower/bower'];

// simple usage, fetch results and render to an element specified by CSS selector
GithubCompare(repos).render('#selector');

// render and return the DOM element
// you can do custom handling
GithubCompare(repos).render(function(el) {
    document.body.appendChild(el);
});

// you can just get the results without rendering
GithubCompare(repos).json(function(data) {
    console.log(data);
});
```

You can use [tablesorter plugin](https://github.com/Mottie/tablesorter) to add sorting functionality to the table. Check the source of `index.html` to see how it is done.
