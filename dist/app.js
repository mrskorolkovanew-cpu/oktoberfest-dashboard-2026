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

let tasks = rawTasks.map(function (row) {
  const cells = row.split("|");
  return {
    id: cells[0],
    stream: cells[1],
    title: cells[2],
    start: cells[3],
    due: cells[4],
    comment: cells[6] || "",
    status: isOnOrBeforeReportDate(cells[4]) ? "Выполнено" : cells[5]
  };
});

const scheduleFile = "График_подготовки_Октоберфест.xlsx";
const fallbackById = new Map(tasks.map(function (task) { return [String(task.id).replace(/\.$/, ""), task]; }));
const fallbackByTitle = new Map(tasks.map(function (task) { return [normalizeTitle(task.title), task]; }));

const statusMeta = {
  "Выполнено": { label: "Выполнено", color: "#3d8a61", css: "done" },
  "Частично выполнено": { label: "В работе и частично", color: "#5b9bd5", css: "partial" },
  "В работе": { label: "В работе", color: "#5b9bd5", css: "work" },
  "Не начато": { label: "Не начато", color: "#b8c2cc", css: "not-started" },
  "Ожидает решения": { label: "Ожидает решения", color: "#d87932", css: "decision" }
};
const statusOrder = ["Выполнено", "В работе", "Частично выполнено", "Не начато", "Ожидает решения"];

function normalizeDate(value) {
  if (typeof value === "number" && window.XLSX) {
    const date = XLSX.SSF.parse_date_code(value);
    if (date) return String(date.d).padStart(2, "0") + "." + String(date.m).padStart(2, "0") + "." + date.y;
  }
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return String(value.getDate()).padStart(2, "0") + "." + String(value.getMonth() + 1).padStart(2, "0") + "." + value.getFullYear();
  }
  const text = String(value || "").trim();
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return iso[3] + "." + iso[2] + "." + iso[1];
  return text;
}

function normalizeTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim();
}

function fallbackForTask(id, title) {
  const byId = fallbackById.get(id);
  const normalized = normalizeTitle(title);
  if (byId && normalizeTitle(byId.title) === normalized) return byId;
  if (fallbackByTitle.has(normalized)) return fallbackByTitle.get(normalized);

  const titleTokens = new Set(normalized.split(" ").filter(Boolean));
  let bestMatch = null;
  let bestScore = 0;
  tasks.forEach(function (task) {
    const candidateTokens = new Set(normalizeTitle(task.title).split(" ").filter(Boolean));
    const overlap = Array.from(titleTokens).filter(function (token) { return candidateTokens.has(token); }).length;
    const score = overlap / Math.max(titleTokens.size, candidateTokens.size, 1);
    if (score > bestScore) {
      bestMatch = task;
      bestScore = score;
    }
  });
  return bestScore >= 0.5 ? bestMatch : null;
}

function statusFromNote(note, fallbackStatus) {
  const value = String(note || "").trim().toLowerCase();
  if (value.includes("выполнено частично")) return "Частично выполнено";
  if (value.includes("выполнено") && !value.includes("не выполнено")) return "Выполнено";
  if (value.includes("принято решение")) return "Выполнено";
  if (value.includes("изготовлено")) return "Частично выполнено";
  return fallbackStatus || "Не начато";
}

function loadSpreadsheetLibrary() {
  if (window.XLSX) return Promise.resolve();
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.onload = resolve;
    script.onerror = function () { reject(new Error("Не удалось подключить модуль чтения графика")); };
    document.head.append(script);
  });
}

async function loadTasksFromSchedule() {
  try {
    await loadSpreadsheetLibrary();
    const response = await fetch(encodeURI(scheduleFile), { cache: "no-store" });
    if (!response.ok) throw new Error("График пока недоступен");
    const workbook = XLSX.read(await response.arrayBuffer(), { type: "array", cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: "" });
    const headerRow = rows.findIndex(function (row) {
      return String(row[0]).trim() === "№" && String(row[1]).trim() === "Задача";
    });
    if (headerRow < 0) throw new Error("Не найдена строка заголовков");
    const headers = rows[headerRow].map(function (value) { return String(value).trim(); });
    const idColumn = headers.indexOf("№");
    const titleColumn = headers.indexOf("Задача");
    const startColumn = headers.indexOf("Начало");
    const dueColumn = headers.indexOf("Окончание / срок");
    const noteColumn = headers.findIndex(function (header) {
      return header.toLowerCase().startsWith("примечание");
    });
    const importedTasks = rows.slice(headerRow + 1)
      .filter(function (row) { return String(row[idColumn] || "").trim() && String(row[titleColumn] || "").trim(); })
      .map(function (row) {
        const id = String(row[idColumn]).trim().replace(/\.$/, "");
        const title = String(row[titleColumn]).trim();
        const fallback = fallbackForTask(id, title);
        const comment = noteColumn >= 0 ? String(row[noteColumn] || "").trim() : "";
        return {
          id: id,
          stream: fallback ? fallback.stream : "Не указано",
          title: title,
          start: normalizeDate(row[startColumn]),
          due: normalizeDate(row[dueColumn]),
          comment: comment,
          status: statusFromNote(comment, fallback && fallback.status)
        };
      });
    if (!importedTasks.length) throw new Error("В графике нет задач");
    one("#source-status").textContent = "Источник: график подготовки";
    return importedTasks;
  } catch (error) {
    one("#source-status").textContent = "Источник: резервная версия графика";
    console.warn("Не удалось загрузить график подготовки", error);
    return tasks;
  }
}

function one(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
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
  one("#status-filter").innerHTML = '<option value="all">Все статусы</option>' + statusOrder.map(function (status) {
    return '<option value="' + status + '">' + status + '</option>';
  }).join("");
  one("#stream-filter").innerHTML = '<option value="all">Все направления</option>' + streams.map(function (stream) {
    return '<option value="' + stream + '">' + stream + '</option>';
  }).join("");
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
      const comment = task.comment
        ? '<span class="task-comment">' + escapeHtml(task.comment) + '</span>'
        : '<span class="task-comment task-comment--empty">—</span>';
      return '<tr><td>' + escapeHtml(task.id) + '</td><td>' + escapeHtml(task.title) + '</td><td>' + escapeHtml(task.start) + '</td><td>' + escapeHtml(task.due) + '</td><td><span class="task-status task-status--' + statusClass(task.status) + '">' + escapeHtml(task.status) + '</span></td><td>' + comment + '</td></tr>';
  }).join("");
}

function taskDate(value) {
  const match = String(value || "").match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function renderFocus() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const activeTasks = tasks
    .filter(function (task) { return task.status !== "Выполнено"; })
    .sort(function (left, right) {
      const leftDate = taskDate(left.due);
      const rightDate = taskDate(right.due);
      return (leftDate ? leftDate.valueOf() : Number.MAX_SAFE_INTEGER) - (rightDate ? rightDate.valueOf() : Number.MAX_SAFE_INTEGER);
    })
    .slice(0, 6);

  one("#focus-period").textContent = "на " + String(today.getDate()).padStart(2, "0") + "." + String(today.getMonth() + 1).padStart(2, "0") + "." + today.getFullYear();
  one("#milestone-list").innerHTML = activeTasks.length
    ? activeTasks.map(function (task) {
        const dueDate = taskDate(task.due);
        const overdue = dueDate && dueDate < today;
        const comment = task.comment
          ? '<p class="focus-comment"><strong>Комментарий:</strong> ' + escapeHtml(task.comment) + '</p>'
          : "";
        const datetime = dueDate
          ? dueDate.getFullYear() + "-" + String(dueDate.getMonth() + 1).padStart(2, "0") + "-" + String(dueDate.getDate()).padStart(2, "0")
          : "";
        const statusLabel = overdue ? "Срок прошёл · " + task.status : task.status;
        return '<li><time datetime="' + datetime + '">' + escapeHtml(task.due) + '</time><div><strong class="focus-title">' + escapeHtml(task.title) + '</strong><p class="focus-meta"><span class="focus-status' + (overdue ? " focus-status--overdue" : "") + '">' + escapeHtml(statusLabel) + "</span></p>" + comment + "</div></li>";
      }).join("")
    : '<li class="focus-empty">Нет незавершённых задач в актуальном графике.</li>';
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

function renderDashboard() {
  renderProgress();
  renderFocus();
  renderWorkstreams();
  renderFilters();
  renderTaskTable();
}

async function initializeDashboard() {
  renderDashboard();
  tasks = await loadTasksFromSchedule();
  renderDashboard();
}

initializeDashboard();
