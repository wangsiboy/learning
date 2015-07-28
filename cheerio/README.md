###cheerio
为服务器特别定制的，快速、灵活、实施的jQuery核心实现.

###Introduction
将HTML告诉你的服务器

```
	var cheerio = require('cheerio'),
    $ = cheerio.load('<h2 class="title">Hello world</h2>');
    $('h2.title').text('Hello there!');
    $('h2').addClass('welcome');
    $.html();
	//=> <h2 class="title welcome">Hello there!</h2>
```