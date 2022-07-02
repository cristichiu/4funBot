/*
    Adauga un raspuns la mesaje dupa modelul urmator:
    Intre [] la "const model" adaugi urmatoarea chestie:
    {
        start: "orice mesaj care sa activeze raspunsul", => Neaparat intre "", si virgula la final, ex: "sal"
        raspuns: "orice raspuns care sa fie dat dupa ce se da mesajul de start", => Neaparat intre "", si virgula la final, ex: "salut"
    }, => Sa se adauge neaparat la final virgula!!!

    Un mic exemplu cum trebuie sa arate la final:
    const model = [
        {
            start: "salut",
            raspuns: "BUNAAAA",
        },
        {
            start: "ce faceti",
            raspuns: "bine, tu?",
        },
    ]
*/


const model = [
    {
        start: "wlc",
        raspuns: "bine ai venit pe server",
    },
    {
        start: "tag",
        raspuns: "ﾉ⁴ᶠ sau ⁴ᶠ",
    },
]

module.exports = model