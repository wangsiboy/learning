# 视图模版引擎

使用的 **handlebars** 模版

./layouts 布局

    默认使用main布局
    指定布局 res.render('page', {layout: null });

./partials 局部文件

    需要在不同的页面重复使用的组件
    视图中使用局部文件./partials/social/weibo.hbs的语法：

    ```
    {{> social/weibo}}
    ```

段落

    **代码里加了section辅助方法, 增加段落的方法：**

    ```
    {{{_section.head}}} 布局中使用，标示段落位置
    {{#section 'head'}} {{/section}} 视图中定义段落内容

    ```

## 使用说明

在生产模式下开启模版缓存

** app.set('view cache', true) **

```
1. {{! 不会被传到浏览器的注释 }}
2. {name: 'WangSi'} <p>Hello, {{name}}!</p>
3. {{#each xxx}} {{else}} {{/each}}
4. {{#if xxx}} {{else}} {{/if}}
5. {{#unless xxx}}
6. {{.}}
```
