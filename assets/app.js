(function () {
    var bootEl = document.getElementById("boot");
    var historyEl = document.getElementById("history");
    var formEl = document.getElementById("command-form");
    var inputEl = document.getElementById("inputcmd");
    var hintEl = document.getElementById("terminal-hint");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var state = {
        language: "en",
        commandHistory: [],
        historyIndex: -1,
        draftCommand: ""
    };

    var links = {
        linkedin: "https://www.linkedin.com/in/yevgeniy-sanitskiy/",
        quadrofleet: "https://quadrofleet.com/",
        handelscore: "https://handelscore.de/",
        email: "mailto:contact@beep.systems"
    };
    var knownCommands = [
        "help",
        "whoami",
        "now",
        "projects",
        "project quadrofleet",
        "project handelscore",
        "contact",
        "links",
        "clear",
        "lang en",
        "lang de"
    ];

    var content = {
        en: {
            boot: [
                "BEEP SYSTEMS (TM) TERMINAL PORTFOLIO 2026",
                "Type \"help\" to explore. Use \"lang de\" for Deutsch."
            ],
            hint: "Commands: help, whoami, now, projects, project quadrofleet, project handelscore, contact, links, clear, lang en, lang de",
            onboarding: [
                text("whoami     profile and background"),
                text("projects   selected work"),
                text("contact    LinkedIn and email"),
                text("help       full command list")
            ],
            help: [
                heading("HELP"),
                text("whoami               quick identity"),
                text("now                  current focus"),
                text("projects             list selected projects"),
                text("project quadrofleet  details for QuadroFleet"),
                text("project handelscore  details for HandelScore"),
                text("links                direct links"),
                text("contact              contact links"),
                text("lang en              switch to English"),
                text("lang de              switch to German"),
                text("clear                clear terminal history")
            ],
            about: [
                heading("ABOUT"),
                text("Yevgeniy Sanitskiy"),
                text("I build applied software and hardware products."),
                text("This site is a terminal-style portfolio for selected products and contact routes."),
                blank(),
                text("Selected projects:"),
                text("- QuadroFleet"),
                text("- HandelScore"),
                blank(),
                text("Public profile:"),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/")
            ],
            now: [
                heading("NOW"),
                text("Building and refining applied software and hardware products."),
                text("Current public focus: QuadroFleet and HandelScore."),
                text("This site is intentionally small, fast, and terminal-native.")
            ],
            projects: [
                heading("PROJECTS"),
                text("- QuadroFleet: Long-range drone control over 4G/5G with low-latency video, telemetry, and secure connectivity."),
                text("- HandelScore: B2B partner risk signal for approval, onboarding, and order workflows."),
                blank(),
                text("Type \"project quadrofleet\" or \"project handelscore\" for details.")
            ],
            projectQuadrofleet: [
                heading("QUADROFLEET"),
                text("A system for long-range drone control over 4G/5G."),
                text("Focus: low-latency video, telemetry, remote operations, and secure connectivity."),
                text("Positioning: practical control stack for beyond-local-range drone use cases."),
                link("Website", links.quadrofleet, "quadrofleet.com")
            ],
            projectHandelscore: [
                heading("HANDELSCORE"),
                text("A B2B risk signal product for checking business partners."),
                text("Focus: support for approval, onboarding, and order workflows."),
                text("Positioning: operational decision support around VAT ID and partner validation."),
                link("Website", links.handelscore, "handelscore.de")
            ],
            links: [
                heading("LINKS"),
                link("QuadroFleet", links.quadrofleet, "quadrofleet.com"),
                link("HandelScore", links.handelscore, "handelscore.de"),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/"),
                link("Email", links.email, "contact@beep.systems")
            ],
            contact: [
                heading("CONTACT"),
                text("The best way to reach me is LinkedIn or email."),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/"),
                link("Email", links.email, "contact@beep.systems")
            ],
            languageChanged: {
                en: "Language set to English.",
                de: "Sprache auf Deutsch gesetzt."
            },
            unknownCommand: "Unknown command. Type \"help\"."
        },
        de: {
            boot: [
                "BEEP SYSTEMS (TM) TERMINAL PORTFOLIO 2026",
                "Tippe \"help\" zum Start. Mit \"lang en\" wechselst du zu English."
            ],
            hint: "Befehle: help, whoami, now, projects, project quadrofleet, project handelscore, contact, links, clear, lang en, lang de",
            onboarding: [
                text("whoami     Profil und Hintergrund"),
                text("projects   ausgewaehlte Arbeiten"),
                text("contact    LinkedIn und E-Mail"),
                text("help       volle Befehlsliste")
            ],
            help: [
                heading("HILFE"),
                text("whoami               kurze Identitaet"),
                text("now                  aktueller Fokus"),
                text("projects             ausgewaehlte Projekte"),
                text("project quadrofleet  Details zu QuadroFleet"),
                text("project handelscore  Details zu HandelScore"),
                text("links                direkte Links"),
                text("contact              Kontaktlinks"),
                text("lang en              auf Englisch wechseln"),
                text("lang de              auf Deutsch wechseln"),
                text("clear                Terminal-Verlauf loeschen")
            ],
            about: [
                heading("UEBER MICH"),
                text("Yevgeniy Sanitskiy"),
                text("Ich entwickle praxisnahe Software- und Hardware-Produkte."),
                text("Diese Seite ist ein Terminal-Portfolio fuer ausgewaehlte Produkte und Kontaktwege."),
                blank(),
                text("Ausgewaehlte Projekte:"),
                text("- QuadroFleet"),
                text("- HandelScore"),
                blank(),
                text("Oeffentliches Profil:"),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/")
            ],
            now: [
                heading("JETZT"),
                text("Ich entwickle und verfeinere praxisnahe Software- und Hardware-Produkte."),
                text("Aktueller oeffentlicher Fokus: QuadroFleet und HandelScore."),
                text("Diese Seite ist bewusst klein, schnell und terminal-nativ gehalten.")
            ],
            projects: [
                heading("PROJEKTE"),
                text("- QuadroFleet: Fernsteuerung von Drohnen ueber 4G/5G mit Video, Telemetrie und sicherer Konnektivitaet."),
                text("- HandelScore: B2B-Risikosignal fuer Freigabe-, Onboarding- und Bestellprozesse."),
                blank(),
                text("Tippe \"project quadrofleet\" oder \"project handelscore\" fuer Details.")
            ],
            projectQuadrofleet: [
                heading("QUADROFLEET"),
                text("Ein System fuer die Fernsteuerung von Drohnen ueber 4G/5G."),
                text("Fokus: Video mit geringer Latenz, Telemetrie, Remote-Betrieb und sichere Konnektivitaet."),
                text("Positionierung: praxisnaher Kontroll-Stack fuer Drone-Operations ausserhalb lokaler Reichweite."),
                link("Website", links.quadrofleet, "quadrofleet.com")
            ],
            projectHandelscore: [
                heading("HANDELSCORE"),
                text("Ein B2B-Risikosignal fuer die Pruefung von Geschaeftspartnern."),
                text("Fokus: Unterstuetzung fuer Freigabe-, Onboarding- und Bestellprozesse."),
                text("Positionierung: operative Entscheidungshilfe rund um USt-IdNr. und Partnerpruefung."),
                link("Website", links.handelscore, "handelscore.de")
            ],
            links: [
                heading("LINKS"),
                link("QuadroFleet", links.quadrofleet, "quadrofleet.com"),
                link("HandelScore", links.handelscore, "handelscore.de"),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/"),
                link("E-Mail", links.email, "contact@beep.systems")
            ],
            contact: [
                heading("KONTAKT"),
                text("Am besten erreichst du mich ueber LinkedIn oder per E-Mail."),
                link("LinkedIn", links.linkedin, "linkedin.com/in/yevgeniy-sanitskiy/"),
                link("E-Mail", links.email, "contact@beep.systems")
            ],
            languageChanged: {
                en: "Language set to English.",
                de: "Sprache auf Deutsch gesetzt."
            },
            unknownCommand: "Unbekannter Befehl. Tippe \"help\"."
        }
    };

    function text(value) {
        return { kind: "text", value: value };
    }

    function heading(value) {
        return { kind: "heading", value: value };
    }

    function link(label, href, value) {
        return { kind: "link", label: label, href: href, value: value };
    }

    function blank() {
        return { kind: "blank" };
    }

    function getLocale() {
        return content[state.language];
    }

    function scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: prefersReducedMotion ? "auto" : "smooth" });
    }

    function appendCommand(command) {
        var entry = document.createElement("div");
        entry.className = "entry entry-command";
        entry.textContent = "> " + command;
        historyEl.appendChild(entry);
    }

    function renderLines(lines, target) {
        var container = document.createElement("div");
        container.className = "entry entry-output";

        lines.forEach(function (line) {
            var node = document.createElement("p");
            node.className = "line";

            if (line.kind === "blank") {
                node.innerHTML = "&nbsp;";
            } else if (line.kind === "heading") {
                node.classList.add("line-heading");
                node.textContent = line.value;
            } else if (line.kind === "link") {
                node.classList.add("line-link");
                var label = document.createElement("span");
                label.textContent = line.label + ": ";
                var anchor = document.createElement("a");
                anchor.href = line.href;
                anchor.target = "_blank";
                anchor.rel = "noreferrer";
                anchor.textContent = line.value;
                node.appendChild(label);
                node.appendChild(anchor);
            } else {
                node.textContent = line.value;
            }

            container.appendChild(node);
        });

        target.appendChild(container);
        scrollToBottom();
    }

    function setLanguage(language) {
        state.language = language;
        document.documentElement.lang = language;
        hintEl.textContent = getLocale().hint;
    }

    function resetInput() {
        inputEl.value = "";
        state.historyIndex = -1;
        state.draftCommand = "";
        inputEl.focus();
    }

    function normalizeCommand(value) {
        return value.trim().toLowerCase().replace(/\s+/g, " ");
    }

    function getMatchingCommands(value) {
        var normalized = normalizeCommand(value);

        if (!normalized) {
            return [];
        }

        return knownCommands.filter(function (command) {
            return command.indexOf(normalized) === 0;
        });
    }

    function getCommonPrefix(values) {
        if (!values.length) {
            return "";
        }

        return values.slice(1).reduce(function (prefix, value) {
            var nextPrefix = prefix;

            while (value.indexOf(nextPrefix) !== 0 && nextPrefix) {
                nextPrefix = nextPrefix.slice(0, -1);
            }

            return nextPrefix;
        }, values[0]);
    }

    function autocompleteInput() {
        var matches = getMatchingCommands(inputEl.value);

        if (!matches.length) {
            return;
        }

        if (matches.length === 1) {
            inputEl.value = matches[0];
            return;
        }

        var commonPrefix = getCommonPrefix(matches);
        var normalizedInput = normalizeCommand(inputEl.value);

        if (commonPrefix && commonPrefix.length > normalizedInput.length) {
            inputEl.value = commonPrefix;
            return;
        }

        renderLines([text(matches.join("    "))], historyEl);
    }

    function showPreviousCommand() {
        if (!state.commandHistory.length) {
            return;
        }

        if (state.historyIndex === -1) {
            state.draftCommand = inputEl.value;
            state.historyIndex = state.commandHistory.length - 1;
        } else if (state.historyIndex > 0) {
            state.historyIndex -= 1;
        }

        inputEl.value = state.commandHistory[state.historyIndex];
    }

    function showNextCommand() {
        if (state.historyIndex === -1) {
            return;
        }

        if (state.historyIndex < state.commandHistory.length - 1) {
            state.historyIndex += 1;
            inputEl.value = state.commandHistory[state.historyIndex];
            return;
        }

        state.historyIndex = -1;
        inputEl.value = state.draftCommand;
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            event.preventDefault();
            inputEl.value = "";
            state.historyIndex = -1;
            state.draftCommand = "";
            return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
            event.preventDefault();
            historyEl.innerHTML = "";
            resetInput();
            return;
        }

        if (event.key === "Tab") {
            event.preventDefault();
            autocompleteInput();
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            showPreviousCommand();
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            showNextCommand();
        }
    }

    function executeCommand(rawCommand) {
        var locale = getLocale();
        var command = normalizeCommand(rawCommand);

        if (!command) {
            return;
        }

        if (command === "clear") {
            historyEl.innerHTML = "";
            return;
        }

        if (command === "help") {
            renderLines(locale.help, historyEl);
            return;
        }

        if (command === "whoami") {
            renderLines(locale.about, historyEl);
            return;
        }

        if (command === "now") {
            renderLines(locale.now, historyEl);
            return;
        }

        if (command === "projects") {
            renderLines(locale.projects, historyEl);
            return;
        }

        if (command === "project quadrofleet") {
            renderLines(locale.projectQuadrofleet, historyEl);
            return;
        }

        if (command === "project handelscore") {
            renderLines(locale.projectHandelscore, historyEl);
            return;
        }

        if (command === "links") {
            renderLines(locale.links, historyEl);
            return;
        }

        if (command === "contact") {
            renderLines(locale.contact, historyEl);
            return;
        }

        if (command === "lang en" || command === "lang de") {
            var nextLanguage = command.slice(-2);
            setLanguage(nextLanguage);
            renderLines([text(getLocale().languageChanged[nextLanguage])], historyEl);
            return;
        }

        renderLines([text(locale.unknownCommand)], historyEl);
    }

    function handleSubmit(event) {
        event.preventDefault();

        var rawCommand = inputEl.value;

        if (!rawCommand.trim()) {
            resetInput();
            return;
        }

        state.commandHistory.push(rawCommand);
        appendCommand(rawCommand);
        executeCommand(rawCommand);
        resetInput();
    }

    function createBootLine() {
        var line = document.createElement("p");
        line.className = "boot-line";
        return line;
    }

    function typeBootLine(textValue) {
        return new Promise(function (resolve) {
            var line = createBootLine();
            var cursor = document.createElement("span");
            cursor.className = "cursor";
            bootEl.appendChild(line);
            line.appendChild(cursor);

            if (prefersReducedMotion) {
                line.textContent = textValue;
                resolve();
                return;
            }

            var index = 0;

            function step() {
                if (index > textValue.length) {
                    line.textContent = textValue;
                    resolve();
                    return;
                }

                line.textContent = textValue.slice(0, index);
                line.appendChild(cursor);
                index += 1;
                window.setTimeout(step, 18);
            }

            step();
        });
    }

    function boot() {
        setLanguage(state.language);

        getLocale().boot.reduce(function (promise, line) {
            return promise.then(function () {
                return typeBootLine(line);
            }).then(function () {
                return new Promise(function (resolve) {
                    window.setTimeout(resolve, prefersReducedMotion ? 0 : 180);
                });
            });
        }, Promise.resolve()).then(function () {
            formEl.classList.remove("hidden");
            hintEl.classList.remove("hidden");
            resetInput();
            renderLines(getLocale().onboarding, historyEl);
        });
    }

    formEl.addEventListener("submit", handleSubmit);
    inputEl.addEventListener("keydown", handleKeydown);
    document.getElementById("terminal-window").addEventListener("click", function () {
        inputEl.focus();
    });

    boot();
}());
