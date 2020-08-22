function cardHtml(name, xp, arc, color, anytimep, major, flavor, desc) {
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
    ret += '<div style="margin: 0px 40px; width: 440px; font: 10pt Tinos, serif; color: black">';
    if (anytimep) {
        ret += '<div style="font: bold 13pt Droid Serif, serif; margin: 0px 0px 5px">Bonus XP</div>';
        for (let i = 0; i < ANYTIME[color].length; ++i) {
            ret += ANYTIME[color][i];
            if (i < major.length && major[i]) {
                ret += '<center style="font-size: 12pt">' + major[i] + '</center>';
            }
        }
    } else {
        ret += '<div style="font: bold 13pt Droid Serif, serif; margin: 0px 0px 5px">Major Goals</div>The HG can award you 5 XP towards this quest when:<ul style="margin: 0 0 1ex 1em; padding: 0px; list-style: none; text-indent: -1em">';
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

const colors = ['purple', 'red', 'blue', 'gold', 'green', 'orange', 'silver', 'black'];
const FLAVOR_RE = / *(?::(purple|red|blue|gold|green|orange|silver|black):)? *(?::(purple|red|blue|gold|green|orange|silver|black):)? *(.*)/i;

const ANYTIME = {
    purple: ['<p>There’s something you’re working on:</p>', '<p>You can earn a bonus XP towards this quest at any time (but only once per scene/15 minutes) by explaining away what you’ve been doing or trying for in the current scene as part of that thing you’re doing.</p><p>Pick a standard phrase to indicate this, and then just say that phrase or some close variant when you want to claim the bonus.</p><p>What’s your phrase?</p>', '<p>The idea is that by saying that, you either confirm that something is about the thing you’re working on, or you make yourself a little goofy and perhaps overly earnest.</p>'],
    red: ['<p>There’s something that just rivets your attention when it happens; or when you think about it; or when something fits your thoughts about it.</p><p>Something you love. Something you fear. Something like...</p>', '<p>Pick a catchphrase for this. You don’t have to use the exact same catchphrase every time, but it’s the core of your experience here. It’s what you say to show that your attention has been totally caught.</p>', '<p>You can earn a bonus XP towards this quest at any time (but only once per scene/15 minutes) with an emote or a statement that goes basically like that!</p>'],
    blue: ['<p>There’s something you’re always thinking about. It’s a lens that you see everything else through.</p>', '<p>You can earn a bonus XP towards this quest at any time (but only once per scene/15 minutes) by <b>proposing a new theory about that thing you’re always thinking about</b>.</p><p>Make sure to actually stop and consider the theory—I mean, it’s OK if someone stops you, but the point isn’t to come up with something goofy to say, the point is to come up with new thoughts to <i>genuinely</i> consider.</p>'],
    gold: ['<p>There’s something you’re doing:</p>', '<p>...and you get really worked up over it. Well, you do, or the world does. Ridiculous, absurd things happen. Things get hectic.</p><p>So, look. Arrange for a sign.</p><p>It should say “<b>Over the Top</b>.”</p><p>You can earn a bonus XP towards this quest at any time (but only once per scene/15 minutes) when your quest, or its consequences, or what you do about it, gets a little over the top.</p><p>Or, for that matter, when you <i>decide</i> to make them a little over the top.</p><p>When that happens, hold up the sign or otherwise declare/observe that things have</p><p>gotten over the top and you can claim the XP.</p><p>You don’t even have to say anything in character! You just have to be willing to hold up a sign. It’s even OK if sometimes you’re being ironic or making a suggestion instead of an observation, as long as an observation is more typical.</p>'],
    green: ['<p>You’re torn between two worlds or two selves; between:</p>', '<p>and</p>', '<p>Ideally, you’ll make a sign for this—a reversible card, which you could in theory have on the table in front of you in play to show which state you’re in. You can earn a bonus XP at any time (though only once per scene/15 minutes) by flipping the card, showing that you’re moving between the two states.</p><p>If you can’t actually keep the card in front of you, holding up the card with the relevant side facing people or just saying or emoting something appropriate can earn you the XP instead.</p>'],
    orange: ['<p>There’s something you’re trying to do or be. It’s probably even a good thing!</p><p>...but this quest comes with a psychological or social burden—a private cross to bear. Something you can’t handle as well as you like to pretend. Something you have trouble processing. When you’re saying or emoting <i>this</i> to everyone...</p>', '<p>Some deeply- or shallowly-buried part of you is actually thinking this:</p>', '<p>Create or pick out a two-sided sign: one side is your public face, the other shows your hidden thoughts. You can earn a bonus XP at any time (though only once per 15 minutes/scene) by expressing that emotion—normally, by holding up the sign.</p><p>The back side of the sign reminds you of your flaws. If you’re not playing in a place where you can actually hold up the sign, it’s OK to just remind yourself quietly of what it says, or, if you must, ignore the back side in its entirety.</p>'],
    silver: ['<p>There’s something you just have to live through, day by day.</p>', '<p>And there’s something—some experience or memory—that helps mark out those days. There is something that draws your attention when this quest casts its shadow or its light upon your life.</p><p>You can earn a bonus XP towards this quest at any time (but only once per scene/15 minutes) by directing attention to this experience. This usually relies on a specific catch phrase—e.g., your attention drifts to the birds flying out over Big Lake, and you say, “Listen to those birds.”</p><p>...or whatever.</p><p>What catch phrase do you use?</p>', ''],
    black: ['<p>There’s something going on. You think it means... you think it... it <i>relates</i> to...</p>', '<p>You can earn a bonus XP towards this quest at any time (though only once per scene/15 minutes) by declaring that you can feel the touch of it, the thing, the it, the miracle, the strangeness, the dissociation, the unnameable, the it, the thing</p><p>—you can phrase it another way; just give some indication that you’re triggering this quest condition—</p><p>and then free-associating for a few moments about what your character is experiencing, feeling, thinking.</p><p>Talk about being cold, or warm; talk about visions; whatever. Clenching muscles in your arms. Hunger in the sky. Whatever. Random rambles and chill sensations across your back, gnashing stars in the glory beyond the world. That kind of experience, the taste of bugs chattering in the summer, and that brings you in a bonus XP for this quest.</p>'],
};

function capitalize(s) {
    if (!s) {
        return '';
    }
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function update(event) {
    if (event && event.target.className == 'blockmode') {
        if (event.target.id == 'majorblock') {
            const goals = event.target.value.split('\n');
            for (let i = 0; i < 6; ++i) {
                document.getElementById('major' + (i+1)).value
                    = goals[i] || '';
            }
        } else {
            const flavors = event.target.value.split('\n');
            for (let i = 0; i < 12; ++i) {
                const [full, c1, c2, flavor]
                      = flavors[i] ? FLAVOR_RE.exec(flavors[i])
                      : ['', undefined, undefined, ''];
                document.getElementById('cf' + (i+1) + 'a').value
                    = capitalize(c1) || 'Purple';
                document.getElementById('cf' + (i+1) + 'b').value
                    = capitalize(c2);
                document.getElementById('flavor' + (i+1)).value = flavor;
            }
        }
    }
    // Save to hash
    let elmses = [document.getElementsByTagName('select'),
                  document.getElementsByTagName('input'),
                  document.getElementsByTagName('textarea')];
    let hash = [];
    for (let h = 0; h < elmses.length; ++h) {
        let elms = elmses[h];
        for (let i = 0; i < elms.length; ++i) {
            let elm = elms[i];
            if (elm.className == "copyable" || elm.id == "toggle" || elm.id == "block" || elm.className.startsWith("blockmode")) {
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
    console.log(hashstr);
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
    if ($('anytime').checked) {
        for (var i = 1; i <= 2; ++i) {
            major.push($('at' + i).value);
        }
    } else {
        for (var i = 1; i <= 6; ++i) {
            if ($('major' + i).value) {
                major.push($('major' + i).value);
            }
        }
    }
    var flavor = [];
    for (var i = 1; i <= 12; ++i) {
        if ($('flavor' + i).value) {
            flavor.push([$('cf'+i+'a').value.toLowerCase(), $('cf'+i+'b').value.toLowerCase(), $('flavor' + i).value]);
        }
    }
    var html = cardHtml($('name').value, $('xp').value, arc, $('color').value.toLowerCase(), $('anytime').checked, major, flavor, $('desc').value);
    let discord = cardDiscord($('name').value, $('xp').value, arc, $('color').value.toLowerCase(), $('anytime').checked, major, flavor, $('desc').value);
    $('html').value = html;
    $('discord').value = discord;
    $('thing').innerHTML = html;
    document.getElementsByTagName('title')[0].innerText = $('name').value;

    let majorblockval = '';
    for (let i = 1; i <= 6; ++i) {
        majorblockval += document.getElementById('major' + i).value + '\n';
    }
    document.getElementById('majorblock').value = majorblockval;

    let flavorblockval = '';
    for (let i = 1; i <= 12; ++i) {
        let tmp = '';
        const a = document.getElementById('cf' + i + 'a');
        if (a.value) {
            tmp += ':' + a.value.toLowerCase() + ': ';
        }
        const b = document.getElementById('cf' + i + 'b');
        if (b.value) {
            tmp += ':' + b.value.toLowerCase() + ': ';
        }
        tmp += document.getElementById('flavor' + i).value + '\n';
        if (tmp != ':purple: \n') {
            flavorblockval += tmp;
        } else {
            flavorblockval += '\n';
        }
    }
    document.getElementById('flavorblock').value = flavorblockval.replace(
            /\n*$/, '');
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
