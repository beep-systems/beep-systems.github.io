(function () {
    "use strict";

    var localeKey = "beep-systems:locale";
    var language = "en";
    var switcher = document.getElementById("language-switcher");

    // Keep the English fallback in index.html in sync with this registry.
    var projects = [
        {
            id: "quadrofleet", name: "QuadroFleet", url: "https://quadrofleet.com/", kind: "website",
            en: {
                summary: "Long-range drone control over 4G/5G with FPV video and telemetry.",
                technical: "OpenIPC video, WireGuard connectivity and CRSF flight-controller integration."
            },
            de: {
                summary: "Drohnenfernsteuerung über 4G/5G mit FPV-Video und Telemetrie.",
                technical: "OpenIPC-Video, WireGuard-Verbindungen und Integration von CRSF-Flugcontrollern."
            }
        },
        {
            id: "fsk-comm", name: "FSK Comm", url: "https://fsk.beep.systems/", kind: "website",
            en: {
                summary: "An Android app for sending short encrypted messages through sound.",
                technical: "BFSK modulation, shared-key message protection and a compact send-and-listen workflow."
            },
            de: {
                summary: "Eine Android-App zum Senden kurzer verschlüsselter Nachrichten über Schall.",
                technical: "BFSK-Modulation, Nachrichtenschutz mit gemeinsamem Schlüssel und ein kompakter Senden-und-Hören-Ablauf."
            }
        },
        {
            id: "voluscape", name: "VoluScape", url: "https://voluscape.beep.systems/", kind: "demo",
            en: {
                summary: "Drone footage reconstructed into explorable 3D landscapes using Gaussian splatting.",
                technical: "Reconstruction tools built around Spirula, plus a gallery and viewer extensions based on SuperSplat and PlayCanvas."
            },
            de: {
                summary: "Drohnenaufnahmen werden mit Gaussian Splatting zu erkundbaren 3D-Landschaften rekonstruiert.",
                technical: "Rekonstruktionswerkzeuge auf Basis von Spirula sowie eine Galerie und Viewer-Erweiterungen auf Basis von SuperSplat und PlayCanvas."
            }
        },
        {
            id: "ventureunvault", name: "VentureUnvault", url: "https://ventureunvault.beep.systems/", kind: "website",
            en: {
                summary: "Discover startup projects from multiple sources, generate concise AI summaries and publish attributed posts to Telegram.",
                technical: "n8n, PostgreSQL and Gemini; deduplication before AI processing, controlled retries and reconciliation of uncertain publication outcomes. Website based on Telecast."
            },
            de: {
                summary: "Startup-Projekte aus mehreren Quellen entdecken, prägnante KI-Zusammenfassungen erstellen und Beiträge mit Quellenangabe auf Telegram veröffentlichen.",
                technical: "n8n, PostgreSQL und Gemini; Deduplizierung vor der KI-Verarbeitung, kontrollierte Wiederholungen und Abgleich unklarer Veröffentlichungsergebnisse. Website auf Basis von Telecast."
            }
        },
        {
            id: "drum-machine", name: "Drum Machine", url: "https://drum.beep.systems/", kind: "demo",
            en: {
                summary: "A browser drum machine for guitar practice, from rock to metal.",
                technical: "Web Audio scheduling, acoustic and industrial kits, a rhythm editor, local saving and EN/DE/RU controls."
            },
            de: {
                summary: "Eine Drum Machine im Browser zum Gitarrenüben, von Rock bis Metal.",
                technical: "Web-Audio-Scheduling, akustische und Industrial-Kits, Rhythmuseditor, lokales Speichern und Bedienung auf EN/DE/RU."
            }
        }
    ];

    var content = {
        en: {
            intro: "I build software and hardware tools for drone control, audio communication, 3D reconstruction, workflow automation and music practice.",
            projectsHeading: "Selected projects", contactHeading: "Contact",
            website: "Website", demo: "Demo", languageLabel: "Language",
            languageNames: { en: "EN: English", de: "DE: German" }
        },
        de: {
            intro: "Ich entwickle Software- und Hardware-Werkzeuge für Drohnensteuerung, Audiokommunikation, 3D-Rekonstruktion, Workflow-Automatisierung und Musikübungen.",
            projectsHeading: "Ausgewählte Projekte", contactHeading: "Kontakt",
            website: "Website", demo: "Demo", languageLabel: "Sprache",
            languageNames: { en: "EN: Englisch", de: "DE: Deutsch" }
        }
    };

    function setLanguage(nextLanguage) {
        language = nextLanguage;
        var locale = content[language];
        document.documentElement.lang = language;
        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            node.textContent = locale[node.dataset.i18n];
        });
        projects.forEach(function (project) {
            var article = document.querySelector('[data-project="' + project.id + '"]');
            ["summary", "technical"].forEach(function (field) {
                article.querySelector('[data-field="' + field + '"]').textContent = project[language][field];
            });
            var anchor = article.querySelector('[data-field="link"]');
            anchor.href = project.url;
            anchor.textContent = locale[project.kind] + ": " + new URL(project.url).hostname;
        });
        switcher.setAttribute("aria-label", locale.languageLabel);
        switcher.querySelectorAll("[data-language]").forEach(function (button) {
            button.setAttribute("aria-label", locale.languageNames[button.dataset.language]);
            button.setAttribute("aria-pressed", String(button.dataset.language === language));
        });
    }

    try {
        var savedLanguage = window.localStorage.getItem(localeKey);
        if (savedLanguage === "en" || savedLanguage === "de") { language = savedLanguage; }
    } catch (_) { /* English is the fallback when storage is unavailable. */ }

    switcher.querySelectorAll("[data-language]").forEach(function (button) {
        button.addEventListener("click", function () {
            setLanguage(button.dataset.language);
            try { window.localStorage.setItem(localeKey, language); } catch (_) { /* Keep the selection in memory. */ }
        });
    });
    setLanguage(language);
    switcher.hidden = false;
}());
