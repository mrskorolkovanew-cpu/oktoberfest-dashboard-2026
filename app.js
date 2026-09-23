const rawTasks = [
  "1|Концепция и формат|Подтвердить возможность привлечения 5 000 человек за три дня фестиваля|09.09.2026|11.09.2026|Выполнено",
  "2|Концепция и формат|Определить временной интервал проведения фестиваля и тайминг|09.09.2026|15.09.2026|Выполнено",
  "3|Концепция и формат|Разработать детальную программу мероприятий|09.09.2026|15.09.2026|Выполнено",
  "4|Концепция и формат|Проработать вопрос купонной системы|09.09.2026|15.09.2026|Выполнено",
  "5|Концепция и формат|Определить локации проведения фестиваля с учетом погодных условий|09.09.2026|15.09.2026|Выполнено",
  "6|Концепция и формат|Утвердить локации, количество и варианты фудовых и тематических мастер-классов и активностей|09.09.2026|15.09.2026|Частично выполнено",
  "7|Лаунж-зона|Проработать вопрос утепления лаунж-зоны|09.09.2026|28.09.2026|Ожидает решения",
  "8|Лаунж-зона|Проработать варианты стимуляции посещения всех локаций, особенно лаунж-зоны|15.09.2026|28.09.2026|В работе",
  "9|Бюджет|Подготовить детальное ценообразование по фуд, гриль и лаунж-зонам|01.10.2026|15.10.2026|В работе",
  "10|Бюджет|Разработка и согласование общего бюджета|09.09.2026|25.09.2026|В работе",
  "10.1|Бюджет|Food|09.09.2026|16.09.2026|В работе",
  "10.2|Бюджет|Общая анимация: ведущий, диджей, аниматоры|15.09.2026|16.09.2026|В работе",
  "10.3|Бюджет|Маркетинговый бюджет|11.09.2026|24.09.2026|Выполнено",
  "11|Маркетинг|Маркетинг и реклама|12.09.2026|25.10.2026|В работе",
  "11.1|Маркетинг|Формирование заказа баннеров|12.09.2026|25.09.2026|В работе",
  "11.2|Маркетинг|Изготовление и монтаж баннеров|28.09.2026|01.10.2026|Не начато",
  "11.3|Маркетинг|Запуск и продвижение|28.09.2026|25.10.2026|В работе",
  "12|Food и развлечения|Food и развлечения|21.09.2026|23.10.2026|В работе",
  "12.1|Food и развлечения|Поиск диджея и заключение договора|21.09.2026|10.10.2026|Не начато",
  "12.2|Food и развлечения|Заключить договор аренды звукового и светового оборудования|21.09.2026|10.10.2026|Не начато",
  "12.3|Food и развлечения|При необходимости обновить договоры с ведущими и аниматорами|21.09.2026|10.10.2026|Не начато",
  "12.4|Food и развлечения|Закупить материалы для мастер-классов|01.10.2026|15.10.2026|Не начато",
  "12.5|Food и развлечения|Закупка грилей|05.10.2026|07.10.2026|Не начато",
  "12.6|Food и развлечения|Финальный прозвон и сверка с поставщиками|15.10.2026|15.10.2026|Не начато",
  "12.7|Food и развлечения|Формирование заказа на продукцию и пиво|16.10.2026|16.10.2026|Не начато",
  "12.8|Food и развлечения|Установка звукового и светового оборудования на сцене|20.10.2026|22.10.2026|Не начато",
  "12.9|Food и развлечения|Брифинг персонала и настройка кассовых мест|21.10.2026|23.10.2026|Не начато",
  "12.10|Food и развлечения|Прием поставки продукции в парк|22.10.2026|22.10.2026|Не начато",
  "12.11|Food и развлечения|Подготовка гриль-зон и пивных кранов. Финальный чек|23.10.2026|23.10.2026|Не начато",
  "12.12|Food и развлечения|Проверка готовности, развоз продукции и установка кег|23.10.2026|23.10.2026|Не начато",
  "13|Фестиваль|Открытие фестиваля|23.10.2026|23.10.2026|Не начато",
  "14|Фестиваль|Закрытие фестиваля|25.10.2026|25.10.2026|Не начато"
];

const reportDate = "23.09.2026";

function isOnOrBeforeReportDate(date) {
  const [day, month, year] = date.split(".").map(Number);
  const [reportDay, reportMonth, reportYear] = reportDate.split(".").map(Number);
  return new Date(year, month - 1, day) <= new Date(reportYear, reportMonth - 1, reportDay);
}

const tasks = rawTasks.map(function (row) {
  const cells = row.split("|");
  return {
    id: cells[0],
    stream: cells[1],
    title: cells[2],
    start: cells[3],
    due: cells[4],
    status: isOnOrBeforeReportDate(cells[4]) ? "Выполнено" : cells[5]
  };
});

const statusMeta = {
  "Выполнено": { label: "Выполнено", color: "#3d8a61", css: "done" },
  "Частично выполнено": { label: "В работе и частично", color: "#5b9bd5", css: "partial" },
  "В работе": { label: "В работе", color: "#5b9bd5", css: "work" },
  "Не начато": { label: "Не начато", color: "#b8c2cc", css: "not-started" },
  "Ожидает решения": { label: "Ожидает решения", color: "#d87932", css: "decision" }
};
const statusOrder = ["Выполнено", "В работе", "Частично выполнено", "Не начато", "Ожидает решения"];

function one(selector) {
  return document.querySelector(selector);
}
function countFor(status) {
  return tasks.filter(function (task) { return task.status === status; }).length;
}
function statusClass(status) {
  return statusMeta[status].css;
}

function renderProgress() {
  const total = tasks.length;
  const completed = countFor("Выполнено");
  one("#completed-percent").textContent = Math.round((completed / total) * 100) + "%";
  one("#task-total").textContent = "(" + total + ")";

  one("#stacked-bar").innerHTML = statusOrder
    .filter(function (status) { return countFor(status) > 0; })
    .map(function (status) {
      const count = countFor(status);
      const width = (count / total) * 100;
      return '<span class="stack-segment" title="' + statusMeta[status].label + ': ' + count + '" style="width:' + width + '%; background:' + statusMeta[status].color + '"></span>';
    }).join("");

  const compact = [
    { label: "Выполнено", count: completed, color: "#3d8a61" },
    { label: "В работе и частично", count: countFor("В работе") + countFor("Частично выполнено"), color: "#5b9bd5" },
    { label: "Не начато", count: countFor("Не начато"), color: "#b8c2cc" },
    { label: "Ожидает решения", count: countFor("Ожидает решения"), color: "#d87932" }
  ];
  one("#status-list").innerHTML = compact.map(function (item) {
    return '<div class="status-row"><span class="status-dot" style="background:' + item.color + '"></span><span>' + item.label + '</span><strong>' + item.count + '</strong></div>';
  }).join("");
}

function renderWorkstreams() {
  const streams = Array.from(new Set(tasks.map(function (task) { return task.stream; })));
  one("#workstream-grid").innerHTML = streams.map(function (stream) {
    const list = tasks.filter(function (task) { return task.stream === stream; });
    const done = list.filter(function (task) { return task.status === "Выполнено"; }).length;
    const readiness = Math.round((done / list.length) * 100);
    return '<article class="workstream-card"><h3>' + stream + '</h3><p>' + list.length + ' задач · ' + done + ' завершено</p><div class="workstream-meta"><span>готовность</span><strong>' + readiness + '%</strong></div></article>';
  }).join("");
}

function renderFilters() {
  const streams = Array.from(new Set(tasks.map(function (task) { return task.stream; })));
  one("#status-filter").insertAdjacentHTML("beforeend", statusOrder.map(function (status) {
    return '<option value="' + status + '">' + status + '</option>';
  }).join(""));
  one("#stream-filter").insertAdjacentHTML("beforeend", streams.map(function (stream) {
    return '<option value="' + stream + '">' + stream + '</option>';
  }).join(""));
}

function renderTaskTable() {
  const selectedStatus = one("#status-filter").value;
  const selectedStream = one("#stream-filter").value;
  const filtered = tasks.filter(function (task) {
    return (selectedStatus === "all" || task.status === selectedStatus) &&
      (selectedStream === "all" || task.stream === selectedStream);
  });
  one("#visible-task-count").textContent = "Показано: " + filtered.length + " из " + tasks.length;
  one("#task-table-body").innerHTML = filtered.map(function (task) {
      return '<tr><td>' + task.id + '</td><td>' + task.title + '</td><td>' + task.start + '</td><td>' + task.due + '</td><td><span class="task-status task-status--' + statusClass(task.status) + '">' + task.status + '</span></td></tr>';
  }).join("");
}

function showView(viewId) {
  document.querySelectorAll(".view-panel").forEach(function (panel) {
    panel.classList.toggle("is-active", panel.id === viewId);
  });
  document.querySelectorAll(".view-tab").forEach(function (tab) {
    tab.classList.toggle("is-active", tab.dataset.viewTarget === viewId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".view-tab").forEach(function (tab) {
  tab.addEventListener("click", function () { showView(tab.dataset.viewTarget); });
});
document.querySelectorAll("[data-show-schedule]").forEach(function (button) {
  button.addEventListener("click", function () { showView("schedule-panel"); });
});
document.querySelectorAll("[data-show-overview]").forEach(function (button) {
  button.addEventListener("click", function () { showView("overview-panel"); });
});
one("#status-filter").addEventListener("change", renderTaskTable);
one("#stream-filter").addEventListener("change", renderTaskTable);

renderProgress();
renderWorkstreams();
renderFilters();
renderTaskTable();
