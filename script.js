document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".page-item a");
    const contents = document.querySelectorAll(".content");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            contents.forEach(content => {
                content.classList.remove("active");
            });

            target.classList.add("active");
        });
    });

    // Activate the first section by default
    if (links.length > 0) {
        links[0].click();
    }

    const items = document.querySelectorAll('.page-item');

    // 为每个 .page-item 元素添加 onclick 事件
    items.forEach(function (item) {
        item.onclick = function () {
            // 遍历所有 .page-item 元素，设置背景颜色
            items.forEach(function (el) {
                el.style.backgroundColor = '#383839'; // 设置所有 .page-item 的背景颜色
            });
            this.style.backgroundColor = '#7c7c7c'; // 设置被点击的 .page-item 的背景颜色
        };
    });

});