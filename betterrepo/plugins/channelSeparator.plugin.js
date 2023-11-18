//META{"name":"channelSeparator"}*//

/* jshint esversion:6 */

var channelSeparator = function() {
    this.enabled = false;
};

channelSeparator.prototype.start = function() {
    localStorage.MinusGixPluginChannelSeparatorCSSDefault = `.minusgix-fancy {
    text-align: center;
    opacity: 1 !important;
}
.minusgix-fancy > span {
    color: cyan;
    font-size: large;
    font-weight: bold;
    opacity: 1 !important;
}
.minusgix-fancy span:before,
.minusgix-fancy span:after {
    position: absolute;
}
.minusgix-fancy span:before {
    right: 100%;
    margin-right: 15px;
}
.minusgix-fancy span:after {
    left: 100%;
    margin-left: 15px;
}
#minusgix-plugin-channelSeparator-textarea {
    /* this is this textarea you are typing in, I would be careful not to remove it fully */
    width: 80%;
    height: 500px;
    margin-left: 5%;
}
button.minusgix-plugin-channelSeparator-button {
    /* this is the save button you need to save, and the reset button, I would be careful not to remove it fully. */
    width: 20%;
    margin-left: 10%;
}`;
    if (localStorage.MinusGixPluginChannelSeparatorCSS === null || localStorage.MinusGixPluginChannelSeparatorCSS === '' || localStorage.MinusGixPluginChannelSeparatorCSS === undefined) {
        localStorage.MinusGixPluginChannelSeparatorCSS = localStorage.MinusGixPluginChannelSeparatorCSSDefault;

    }

    BdApi.injectCSS('MinusGix-Plugin-channelSeparator', localStorage.MinusGixPluginChannelSeparatorCSS);
    this.enabled = true;
};

function MinusGixPluginChannelSeparator() {
    //called when a server or channel is switched
    if (this.enabled) {
        $('div.channel.channel-text').each(function(index, element) {
            var $chanName = $(element).children('a').children('span.channel-name'),
                text = $chanName.text();

            if (/^\w(\-|\_){2,}(\w)+.*/i.test(text)) {
                $chanName.text(text.replace(/^\w(\-|\_){2,}/, '').replace(/(?!\w).*/, ''));
                $chanName.parent().addClass('minusgix-fancy');
            }
        });
    }
}

channelSeparator.prototype.load = MinusGixPluginChannelSeparator;

channelSeparator.prototype.unload = function() {};

channelSeparator.prototype.stop = function() {
    this.enabled = false;
};

channelSeparator.prototype.onMessage = MinusGixPluginChannelSeparator;

channelSeparator.prototype.onSwitch = MinusGixPluginChannelSeparator;

channelSeparator.prototype.observer = MinusGixPluginChannelSeparator;

channelSeparator.prototype.getSettingsPanel = function() {
    var $settingsPanel = $('<div></div>');

    $settingsPanel.append('<h3>Settings Panel</h3>')
        .append('<textarea id="minusgix-plugin-channelSeparator-textarea"></textarea>');

    $settingsPanel.children('textarea').val(localStorage.MinusGixPluginChannelSeparatorCSS);

    $settingsPanel.append('<button class="minusgix-plugin-channelSeparator-button">Save</button>');

    $($settingsPanel.children('button.minusgix-plugin-channelSeparator-button')[0]).on('click', function() {
        console.log('clicked');
        localStorage.MinusGixPluginChannelSeparatorCSS = $settingsPanel.children('textarea').val();
        BdApi.injectCSS('MinusGix-Plugin-channelSeparator', localStorage.MinusGixPluginChannelSeparatorCSS);
        alert('Saved!');
    });

    $settingsPanel.append('<button class="minusgix-plugin-channelSeparator-button">Reset</button>');

    $($settingsPanel.children('button.minusgix-plugin-channelSeparator-button')[1]).on('click', function() {
        console.log('clicked2');
        $settingsPanel.children('textarea').val(localStorage.MinusGixPluginChannelSeparatorCSSDefault);
        localStorage.MinusGixPluginChannelSeparatorCSS = localStorage.MinusGixPluginChannelSeparatorCSSDefault;
        BdApi.injectCSS('MinusGix-Plugin-channelSeparator', localStorage.MinusGixPluginChannelSeparatorCSS);
        alert('Saved & Resetted!');
    });

    return $settingsPanel[0];
};

channelSeparator.prototype.getName = function() {
    return "Channel Separator Plugin";
};

channelSeparator.prototype.getDescription = function() {
    return "A plugin to make channel separators that some servers employ look nicer.";
};

channelSeparator.prototype.getVersion = function() {
    return "1.0.0";
};

channelSeparator.prototype.getAuthor = function() {
    return "MinusGix";
};