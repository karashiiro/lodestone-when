/**
 * Parses the ID from the query parameter in the URL.
 * @param {PopStateEvent} event
 */
function parseIdFromUrl(event) {
    var url = new URL(document.location);
    var id = url.searchParams.get("id");
    if (id != null) {
        inputField.value = id;
        parseId(event != null);
    }
}

/**
 * Parses the ID from the page input field.
 * @param {boolean} noClobber Whether or not to push a new item to the history stack.
 */
function parseId(noClobber) {
    var idStr = inputField.value;
    if (idStr.length === 0 || idStr.match(/\D/g)) {
        outField.setAttribute("class", "error");
        outField.innerText = "Invalid Lodestone ID";
        return;
    }

    var id = parseInt(idStr);
    outField.setAttribute("class", "");
    outField.innerText = lodestoneIdTime(id);

    var url = new URL(window.location.href);
    url.searchParams.set("id", "" + id);
    if (!noClobber) {
        window.history.pushState({ id }, document.title, url);
    }
}

/**
 * Estimates character creation time based on a Lodestone ID.
 * See https://github.com/karashiiro/lodestone-id-time for more
 * information.
 * @param {number} id The Lodestone ID to process.
 * @returns A Date object containing the estimated creation time for the provided ID.
 */
function lodestoneIdTime(id) {
    var excelTime;
    if (id <= 5000000)
        excelTime = 37.44 / 5000000 * id + 41539.93;
    else if (id > 28208601)
        excelTime = 305.01 / 4775200 * id + 42030.57;
    else
        excelTime = 4.10315437 * Math.pow(10, 4)
            + 1.00993557 * Math.pow(10, -4) * id
            + 31.5417054 * Math.sin(8.57105764 * Math.pow(10, -7) * id);
    var unixMs = (excelTime - 25569) * 86400000;
    return new Date(unixMs);
}

var inputField = document.getElementById("lodestone-id");
var outField = document.getElementById("creation-time");

window.onpopstate = parseIdFromUrl;
window.onload = parseIdFromUrl;