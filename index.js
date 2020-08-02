function cardHtml(name, xp, arc, color, major, flavor, desc) {
    var ret = '<div style="width: 600px; margin: auto">';
    ret += '<h2 style="font: 24pt Amarante, cursive; color: #7B310C; text-align: center">' + name + ' (' + xp + ' XP)</h2><p><b>';
    for (var k in arc) {
        ret += k + ': ';
        for (var i = 0; i < arc[k].length; ++i) {
            ret += '<img src="http://xavid.us/' + arc[k][i] + '.png" width="30" style="vertical-align: middle">';
        }
        ret += '<br />';
    }
    ret += '</b></p>';
    if (desc) {
        const p = '<p style="font: 12pt Tinos, serif">'
        ret += p + desc.replace(/\n\n/g, '</p>'+p) + '</p>';
    }
    ret += '<div style="background: url(http://xavid.us/' + color + '-card.png) 0px 0px/600px; height: 600px; width: 600px; position: relative; -webkit-print-color-adjust: exact">';
    ret += '<div style="height: 0; overflow: visible"><img src="http://xavid.us/' + xp + '.png" style="position: relative; left: 500px; width: 100px" /></div>';
    ret += '<div style="font: bold 18pt Droid Serif, serif; color: black; text-align: center; padding: 55px 140px 48px">'+ name + '</div>';
    ret += '<div style="margin: 0px 40px; width: 440px; font: 10pt Tinos, serif; color: black"><div style="font: bold 13pt Droid Serif, serif; margin: 0px 0px 5px">Major Goals</div>The HG can award you 5 XP towards this quest when:<ul style="margin: 0 0 1ex 1em; padding: 0px; list-style: none; text-indent: -1em">';
    for (var i = 0; i < major.length; ++i) {
        ret += '<li style="margin: 5px 0">☐ ' + major[i] + '</li>';
    }
    ret += '</ul>You can earn each bonus once, for a total of up to ' + major.length * 5 + ' XP.';
    ret += '<div style="font: bold 13pt Droid Serif, serif; margin: 20px 0px 5px">Quest Flavor</div>';
    if ($('mode').value == 'Glitch') {
        ret += "1/chapter, when you're in focus, you can earn a 1 XP for yourself and 1 XP for the quest when:";
    } else {
        ret += '1/chapter, you can earn a bonus XP towards this quest when:';
    }
    ret += '<ul style="margin: 0 0 1ex 2em; padding: 0px; list-style: none; text-indent: -1em">';
    for (var i = 0; i < flavor.length; ++i) {
        ret += '<li style="margin: 5px 0"><img src="http://xavid.us/' + flavor[i][0] + '.png" width="20" style="vertical-align: middle">';
        if (flavor[i][1]) {
            ret += '<img src="http://xavid.us/' + flavor[i][1] + '.png" width="20" style="vertical-align: middle">';
        }
        ret += ' ' + flavor[i][2] + '</li>';
    }
    ret += '</ul>';
    if ($('mode').value == 'Glitch') {
        ret += '…and so can any other player, 1/chapter, if they substitute their PC for yours or otherwise involve them.';
    }
    ret += '</div></div></div>';
    return ret;
}

function cardDiscord(name, xp, arc, color, major, flavor, desc) {
    var ret = '**' + name + ' (' + xp + ') (:' + color + ':)**\n\n';
    for (var k in arc) {
        ret += k + ': ';
        for (var i = 0; i < arc[k].length; ++i) {
            ret += ':' + arc[k][i] + ':';
        }
        ret += '\n';
    }
    ret += '\n';
    if (desc) {
        ret += desc + '\n\n';
    }
    ret += '**Major Goals**\nThe HG can award you 5 XP towards this quest when:\n';
    for (var i = 0; i < major.length; ++i) {
        ret += '☐ ' + major[i] + '\n';
    }
    ret += 'You can earn each bonus once, for a total of up to ' + major.length * 5 + ' XP.\n\n';
    ret += '**Quest Flavor**\n';
    if ($('mode').value == 'Glitch') {
        ret += "1/chapter, when you're in focus, you can earn a 1 XP for yourself and 1 XP for the quest when:";
    } else {
        ret += '1/chapter, you can earn a bonus XP towards this quest when:';
    }
    for (var i = 0; i < flavor.length; ++i) {
        ret += '\n:' + flavor[i][0] + ':';
        if (flavor[i][1]) {
            ret += ':' + flavor[i][1] + ':';
        }
        ret += ' ' + flavor[i][2];
    }
    if ($('mode').value == 'Glitch') {
        ret += '\n…and so can any other player, 1/chapter, if they substitute their PC for yours or otherwise involve them.';
    }
    return ret;
}

function $(id) { return document.getElementById(id); }

var colors = ['purple', 'red', 'blue', 'gold', 'green', 'orange', 'silver', 'black'];

function update() {
    // Save to hash
    let elmses = [document.getElementsByTagName('select'),
                  document.getElementsByTagName('input'),
                  document.getElementsByTagName('textarea')];
    let hash = [];
    for (let h = 0; h < elmses.length; ++h) {
        let elms = elmses[h];
        for (let i = 0; i < elms.length; ++i) {
            let elm = elms[i];
            if (elm.className == "copyable" || elm.id == "toggle" || elm.id == "block") {
                continue;
            }
            if (elm.tagName == 'SELECT' && elm.value == elm.firstElementChild.value) {
                continue;
            }
            if (elm.type == 'checkbox' && !elm.checked) {
                continue;
            }
            if (elm.id && elm.value) {
                hash.push(elm.id + '=' + encodeURIComponent(elm.value));
            }
        }
    }
    let hashstr = hash.join('&');
    history.pushState(null, null,
                      '#' + LZString.compressToEncodedURIComponent(hashstr));
    
    var arc = {};
    for (var i = 1; i <= 5; ++i) {
        for (var c = 0; c < 8; ++c) {
            if ($(colors[c] + '.' + i).checked) {
                if (!(i in arc)) {
                    arc[i] = [colors[c]];
                } else {
                    arc[i].push(colors[c]);
                }
            }
        }
    }
    var major = [];
    for (var i = 1; i <= 6; ++i) {
        if ($('major' + i).value) {
            major.push($('major' + i).value);
        }
    }
    var flavor = [];
    for (var i = 1; i <= 12; ++i) {
        if ($('flavor' + i).value) {
            flavor.push([$('cf'+i+'a').value.toLowerCase(), $('cf'+i+'b').value.toLowerCase(), $('flavor' + i).value]);
        }
    }
    var html = cardHtml($('name').value, $('xp').value, arc, $('color').value.toLowerCase(), major, flavor, $('desc').value);
    let discord = cardDiscord($('name').value, $('xp').value, arc, $('color').value.toLowerCase(), major, flavor, $('desc').value);
    $('html').value = html;
    $('discord').value = discord;
    $('thing').innerHTML = html;
    document.getElementsByTagName('title')[0].innerText = $('name').value;
}

function init() {
    if (location.hash) {
        let hash;
        if (location.hash.indexOf('=') == -1) {
            hash = LZString.decompressFromEncodedURIComponent(
                location.hash.slice(1));
        } else {
            hash = location.hash.slice(1);
        }
        let bits = hash.split('&');

        for (let i = 0; i < bits.length; ++i) {
            let kv = bits[i].split('=');
            let elm = document.getElementById(kv[0]);
            let val = decodeURIComponent(kv[1]);
            if (elm.type == 'checkbox') {
                elm.checked = true;
            } else {
                elm.value = val;
            }
        }
    } else {
        document.getElementById("toggle").checked = true;
    }
    
    update();
}
