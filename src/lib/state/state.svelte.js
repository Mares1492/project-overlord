
const setTaskSettingsValue = (valueToSet) => {
    expeditionSettings.task.value = valueToSet
}

const setApproachSettingsValue = (valueToSet) => {
    expeditionSettings.approach.value = valueToSet
}

const setScaleSettingsValue = (valueToSet) => {
    expeditionSettings.scale.value = valueToSet
}

export const expeditionSettings = $state({
    task: {
        options: [
            {
                name: "Scout",
                handleClick: () => setTaskSettingsValue(0),
                tooltip: "Chart unknown lands, uncover secrets best left buried."
            },
            {
                name: "Loot",
                handleClick: () => setTaskSettingsValue(1),
                tooltip: "Seize wealth from ruin, heedless of curses."
            },
            {
                name: "Foster Ties",
                handleClick: () => setTaskSettingsValue(2),
                tooltip: "Whisper dark promises, forge fragile alliances."
            }
        ],
        value: 0
    },
    approach: {
        options: [
            {
                name: "Stealth",
                handleClick: () => setApproachSettingsValue(0),
                tooltip: "Shadows are your cloak. Strike unseen, or slip away."
            },
            {
                name: "Action",
                handleClick: () => setApproachSettingsValue(1),
                tooltip: "Steel and blood decide this path. Meet foes head-on"
            },
            {
                name: "Situational",
                handleClick: () => setApproachSettingsValue(2),
                tooltip: "Adapt to the dark tide. Cunning or carnage - as fate demands."
            }
        ],
        value: 0
    },
    scale: {
        options: [
            {
                name: "Sprint",
                handleClick: () => setScaleSettingsValue(0),
                tooltip: "A swift foray; little risk, modest spoils."
            },
            {
                name: "Run",
                handleClick: () => setScaleSettingsValue(1),
                tooltip: "Deeper strides; danger grows, rewards beckon."
            },
            {
                name: "Marathon",
                handleClick: () => setScaleSettingsValue(2),
                tooltip: "A grueling campaign; riches and ruin walk hand in hand."
            },
            {
                name: "Odyssey",
                handleClick: () => setScaleSettingsValue(3),
                tooltip: "A legend in the making — triumph or doom writ large."
            }
        ],
        value: 0
    }
});
