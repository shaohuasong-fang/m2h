# 用 Markdown 排版一篇公众号文章

> 左边写 Markdown，右边实时预览，点「复制到公众号」就能直接粘贴。

## 为什么用它

公众号编辑器对代码和表格并不友好，直接粘贴往往丢失层级和样式。这个工具把**所有样式内联**到标签上，粘贴后不会掉格式。

- 标题、列表、引用、表格全部适配公众号
- 顶部下拉可切换 50 种科技感标题样式（H1–H6）与 40 种网格纹理
- 代码块是 macOS 终端风格，带红黄绿三个窗口按钮
- 支持 JavaScript、Python、Go、Rust、SQL、PL/SQL、PL/pgSQL 等几十种语言的关键字高亮
- 纯本地运行，文章内容不会离开这台电脑

## 代码块效果

```python
from datetime import datetime

def greeting(name: str) -> str:
    """按当前时间生成问候语"""
    hour = datetime.now().hour
    prefix = "早上好" if hour < 12 else "下午好"
    return f"{prefix}，{name}！"

print(greeting("公众号"))
```

```javascript
const posts = [
  { title: 'Markdown 入门', views: 1280 },
  { title: '代码高亮实践', views: 960 }
];

const total = posts
  .filter((post) => post.views > 1000)
  .reduce((sum, post) => sum + post.views, 0);

console.log(`总阅读量：${total}`);
```

```go
package main

import "fmt"

type Article struct {
	Title string
	Views int
}

func main() {
	a := Article{Title: "Markdown 转公众号", Views: 2048}
	fmt.Printf("%s 的阅读量：%d\n", a.Title, a.Views)
}
```

```bash
# 安装依赖并启动本地开发服务
npm install
npm run dev

# 构建静态文件
npm run build
```

## Rust 与数据库语言

```rust
#[derive(Debug, Clone)]
struct Article {
    title: String,
    views: u32,
}

impl Article {
    fn is_popular(&self) -> bool {
        self.views > 1000
    }
}

fn main() {
    let post = Article {
        title: String::from("Markdown 转公众号"),
        views: 2048,
    };
    println!("{} 是否热门：{}", post.title, post.is_popular());
}
```

```sql
SELECT a.id, a.title, COUNT(r.id) AS reply_count
FROM articles AS a
LEFT JOIN replies AS r ON r.article_id = a.id
WHERE a.published_at >= DATE '2026-01-01'
GROUP BY a.id, a.title
HAVING COUNT(r.id) > 10
ORDER BY reply_count DESC
LIMIT 20;
```

```plsql
DECLARE
  v_total NUMBER := 0;
BEGIN
  SELECT SUM(views) INTO v_total
  FROM articles
  WHERE status = 'published';

  IF v_total IS NULL THEN
    RAISE_APPLICATION_ERROR(-20001, '暂无已发布文章');
  END IF;

  DBMS_OUTPUT.PUT_LINE('总阅读量：' || v_total);
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE(SQLERRM);
END;
/
```

```plpgsql
CREATE OR REPLACE FUNCTION article_stats(min_views integer)
RETURNS TABLE(title text, views integer) AS $$
BEGIN
  RETURN QUERY
    SELECT a.title, a.views
    FROM articles AS a
    WHERE a.views >= min_views
    ORDER BY a.views DESC;

  IF NOT FOUND THEN
    RAISE NOTICE '没有达到 % 阅读量的文章', min_views;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

## 表格与行内样式

| 元素 | 支持情况 | 说明 |
| --- | --- | --- |
| 标题 | 支持 | 一级标题居中，二级标题带色条 |
| 表格 | 支持 | 单元格边框全部内联 |
| 代码块 | 支持 | 终端风格卡片 + 语法高亮 |

行内代码写成 `const answer = 42`，加粗写成 **重点内容**，斜体写成 *补充说明*，删除线写成 ~~已废弃~~。

### 三级标题示例

三级标题会跟随顶部选择的标题样式，用来说明段落层级。

#### 四级标题

四级标题用于更细的分组。

##### 五级标题

五级标题继续递减字号与颜色。

###### 六级标题

六级标题是最小层级。

1. 在左侧编辑或拖入 `.md` 文件
2. 右侧预览确认排版
3. 点击右上角「复制到公众号」，粘贴进公众号编辑器

> 提示：粘贴后如果个别样式有差异，可以用「下载 HTML」保存完整页面，再用浏览器打开复制。

---

到这里，一篇文章就排好了。
