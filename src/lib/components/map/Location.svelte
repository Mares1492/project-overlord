<script>
    const {color,hovered=false,location} = $props()
</script>

{#snippet fortressIcon()}
        <g transform="translate(10.7, 4) scale(0.45)" stroke="black">
                <path d="M20 5H10V30H20V5Z" fill="#A08679"/>
                <path d="M10 5H20L15 0L10 5Z" fill="#C0B2A5"/>
                <path d="M10 10H0V30H10V10Z" fill="#A08679"/>
                <path d="M0 10H10L5 5L0 10Z" fill="#C0B2A5"/>
                <path d="M30 10H20V30H30V10Z" fill="#A08679"/>
                <path d="M20 10H30L25 5L20 10Z" fill="#C0B2A5"/>
                <path d="M2 10H0V12H2V10Z" fill="#5D4C41"/>
                <path d="M6 10H4V12H6V10Z" fill="#5D4C41"/>
                <path d="M12 5H10V7H12V5Z" fill="#5D4C41"/>
                <path d="M20 5H18V7H20V5Z" fill="#5D4C41"/>
                <path d="M26 10H24V12H26V10Z" fill="#5D4C41"/>
                <path d="M30 10H28V12H30V10Z" fill="#5D4C41"/>
                <path d="M30 19H0V30H30V19Z" fill="#8B7355"/>
                <path d="M20 26H11V30H20V26Z" fill="#8B4513"/>
                <path d="M12 28C14.3333 24 16.6667 24 19 28" stroke="#8B4513"/>
        </g>        
{/snippet}

{#snippet mercCamp()}
        <g transform="translate(10.7, 4) scale(0.45)" stroke="black">
                <path d="M33 0H32V5H33V0Z" fill="#5D4C41"/>
                <path d="M33 0L37 2L33 4V0Z" fill="#8B0000"/>
                <path d="M40 9H25V29H40V9Z" fill="#A08679"/>
                <path d="M25 9H40L32.5 4L25 9Z" fill="#C0B2A5"/>
                <path d="M28 9H25V11H28V9Z" fill="#5D4C41"/>
                <path d="M34 9H31V11H34V9Z" fill="#5D4C41"/>
                <path d="M40 9H37V11H40V9Z" fill="#5D4C41"/>
                <path d="M0 19V29H20V19H0Z" fill="#8B5A2B" fill-opacity="0.3"/>
                <path d="M2 17H0V29H2V17Z" fill="#8B5A2B"/>
                <path d="M0 17H2L1 14L0 17Z" fill="#8B5A2B"/>
                <path d="M7 17H5V29H7V17Z" fill="#8B5A2B"/>
                <path d="M5 17H7L6 14L5 17Z" fill="#8B5A2B"/>
                <path d="M12 17H10V29H12V17Z" fill="#8B5A2B"/>
                <path d="M10 17H12L11 14L10 17Z" fill="#8B5A2B"/>
                <path d="M17 17H15V29H17V17Z" fill="#8B5A2B"/>
                <path d="M15 17H17L16 14L15 17Z" fill="#8B5A2B"/>
                <path d="M22 17H20V29H22V17Z" fill="#8B5A2B"/>
                <path d="M20 17H22L21 14L20 17Z" fill="#8B5A2B"/>
                <path d="M5 29H10L7.5 21L5 29Z" fill="#8B0000"/>
                <path d="M15 29H20L17.5 21L15 29Z" fill="#8B0000"/>
        </g>        
{/snippet}

{#snippet ruins()}
        <g transform="translate(9.5, 7) scale(0.44)" stroke="black">
                <path d="M0 17L1.5 11.5L1 4.5L10 2V7L15 12V17" fill="#8B8B83"/>
                <path d="M20 17L21.5 11.5L20 5H25L23.5 3.5L30 0V5L33 8L35 17" fill="#8B8B83"/>
                <path d="M11.0422 1.81265L15.6787 8.53353L8.95778 13.17L4.32135 6.44908L11.0422 1.81265ZM21.4559 11.3426L22.4525 11.2601L22.6175 13.2533L21.6209 13.3358L21.4559 11.3426ZM10 7.4913L10.9836 7.67182C10.6514 9.48184 10.9297 10.4478 11.3359 10.98C11.7461 11.5174 12.4711 11.856 13.5908 11.986C14.7042 12.1152 16.0341 12.0175 17.4362 11.8471C18.7785 11.684 20.2656 11.4411 21.4559 11.3426L21.5384 12.3392L21.6209 13.3358C20.4671 13.4312 19.1614 13.6522 17.6775 13.8325C16.2535 14.0056 14.724 14.131 13.3602 13.9727C12.0027 13.8151 10.6329 13.3554 9.7461 12.1935C8.85529 11.0265 8.63441 9.39226 9.01643 7.31078L10 7.4913Z" fill="#8B8B83"/>
                <path d="M15 14H12V17H15V14Z" fill="#8B8B83"/>
                <path d="M19 16L18 15L17 17H19V16Z" fill="#8B8B83"/>
                <path d="M40 14L37.5 15.5L37 17H40V14Z" fill="#8B8B83"/>
                <path d="M8.5 15C9.83333 13 10.6667 13 12 15" stroke="#4B7F52"/>
                <path d="M27.5 14.5C28.8333 12.5 29.6667 13.5 31 15.5" stroke="#4B7F52"/>
                <rect x="4.25" y="7.25" width="0.5" height="1.5" stroke="#4B7F55" stroke-width="0.5"/>
                <path d="M10.5 16.5H9.64062L9.93848 15.3086L10.5 14.9336V16.5Z" stroke="#4B7F55"/>
                <rect x="28.25" y="3.25" width="0.5" height="1.5" stroke="#4B7F55" stroke-width="0.5"/>
                <path d="M29.1045 14.8955L29.5 16.082V16.5H28.5V14.6934L29.1045 14.8955Z" stroke="#4B7F55"/>
        </g>        
{/snippet}


{#snippet town()}
        <g transform="translate(9, 4) scale(0.44)" stroke="black">
                <path d="M24 5H16V19H24V5Z" fill="#E6CCB3"/>
                <path d="M12 12H4V24H12V12Z" fill="#D9B38C"/>
                <path d="M35 8H27V20H35V8Z" fill="#D9B38C"/>
                <path d="M12 10H4V12H12V10Z" fill="#8B4513"/>
                <path d="M0 19H40V29H0V19Z" fill="#C0B2A5"/>
                <path d="M0 16H3V19H0V16Z" fill="#C0B2A5"/>
                <path d="M7 16H10V19H7V16Z" fill="#C0B2A5"/>
                <path d="M14 16H17V19H14V16Z" fill="#C0B2A5"/>
                <path d="M23 16H26V19H23V16Z" fill="#C0B2A5"/>
                <path d="M18 16H22V19H18V16Z" fill="#C0B2A5"/>
                <path d="M30 16H33V19H30V16Z" fill="#C0B2A5"/>
                <path d="M37 16H40V19H37V16Z" fill="#C0B2A5"/>
                <path d="M24 24H16V29H24V24Z" fill="#8B4513"/>
                <path d="M18 24.5C19.3333 22.5 20.6667 22.5 22 24.5" stroke="#8B4513"/>
                <path d="M16 5H24L20 0L16 5Z" fill="#8B4513"/>
                <path d="M35 6H27V8H35V6Z" fill="#8B4513"/>
        </g>        
{/snippet}

{#snippet village()}
        <g transform="translate(8.5, 7) scale(0.4)" stroke="black">
                <path d="M19 10H7V20H19V10Z" fill="#D9B38C"/>
                <path d="M7 10H19L13 2L7 10Z" fill="#8B4513"/>
                <path d="M38 8H24V20H38V8Z" fill="#E6CCB3"/>
                <path d="M24 8H38L31 0L24 8Z" fill="#8B4513"/>
                <path d="M4 12H2V20H4V12Z" fill="#8B4513"/>
                <path d="M3 12C4.65685 12 6 10.6569 6 9C6 7.34315 4.65685 6 3 6C1.34315 6 0 7.34315 0 9C0 10.6569 1.34315 12 3 12Z" fill="#2E8B57"/>
                <path d="M42 12H40V20H42V12Z" fill="#8B4513"/>
                <path d="M41 12C42.6569 12 44 10.6569 44 9C44 7.34315 42.6569 6 41 6C39.3431 6 38 7.34315 38 9C38 10.6569 39.3431 12 41 12Z" fill="#2E8B57"/>
        </g>        
{/snippet}

{#snippet wilds()}
        <g transform="translate(8.5, 7) scale(0.4)" stroke="black">
               <path d="M1 25L11 10L16 15L26 0L36 15L41 10V25H1Z" fill="#6B7280"/>
                <path d="M11 10L16 15L26 0L11 10Z" fill="#9CA3AF"/>
                <path d="M36 15L41 10V15H36Z" fill="#9CA3AF"/>
                <path d="M8 18H6V25H8V18Z" fill="#8B4513"/>
                <path d="M7 19C9.20914 19 11 17.2091 11 15C11 12.7909 9.20914 11 7 11C4.79086 11 3 12.7909 3 15C3 17.2091 4.79086 19 7 19Z" fill="#064E3B"/>
                <path d="M15 20H13V25H15V20Z" fill="#8B4513"/>
                <path d="M14 20C15.6569 20 17 18.6569 17 17C17 15.3431 15.6569 14 14 14C12.3431 14 11 15.3431 11 17C11 18.6569 12.3431 20 14 20Z" fill="#064E3B"/>
                <path d="M23 17H21V25H23V17Z" fill="#8B4513"/>
                <path d="M22 18C24.2091 18 26 16.2091 26 14C26 11.7909 24.2091 10 22 10C19.7909 10 18 11.7909 18 14C18 16.2091 19.7909 18 22 18Z" fill="#064E3B"/>
                <path d="M31 19H29V25H31V19Z" fill="#8B4513"/>
                <path d="M30 19C31.6569 19 33 17.6569 33 16C33 14.3431 31.6569 13 30 13C28.3431 13 27 14.3431 27 16C27 17.6569 28.3431 19 30 19Z" fill="#064E3B"/>
                <path d="M38 18H36V25H38V18Z" fill="#8B4513"/>
                <path d="M37 19C39.2091 19 41 17.2091 41 15C41 12.7909 39.2091 11 37 11C34.7909 11 33 12.7909 33 15C33 17.2091 34.7909 19 37 19Z" fill="#064E3B"/>
                <path d="M1 26L11 28L21 26.5L32.5 28L41 26" stroke="#3B82F6" stroke-opacity="0.6" stroke-width="2"/>
        </g>        
{/snippet}



<g
        transform="{hovered?'translate(-5,-8) scale(1.3)':''}"
        class="transition-all duration-200">
    <path
            class="stroke-2 fill-{color}"
            d="M17.5 0.5C24.6306 0.5 29.5 6.45979 29.5 13.2959C29.4999 14.9511 28.7565 17.3814 27.5859 20.1543C26.4238 22.9071 24.8708 25.9291 23.3125 28.7402C21.755 31.5498 20.1974 34.1414 19.0283 36.0303C18.444 36.9744 17.9568 37.7425 17.6162 38.2744C17.5775 38.3349 17.5398 38.392 17.5049 38.4463C17.4678 38.3871 17.4282 38.3243 17.3867 38.2578C17.0461 37.7118 16.5591 36.9233 15.9746 35.9551C14.8054 34.0181 13.2471 31.363 11.6895 28.4893C10.1309 25.6139 8.57758 22.527 7.41504 19.7256C6.24393 16.9035 5.50003 14.4406 5.5 12.7842C5.5 5.97434 10.3452 0.5 17.5 0.5Z"
            stroke="black"
    />
    <path
            class="stroke-2 "
            d="M22.6971 31.5089C26.6265 32.0156 29.937 33.0741 32.0584 34.4599C33.1175 35.1518 33.8155 35.8829 34.1832 36.601C34.5439 37.3054 34.5962 38.0122 34.3422 38.7163C34.0824 39.4366 33.4955 40.17 32.5621 40.8698C31.6316 41.5675 30.3827 42.2117 28.8489 42.7602C25.7804 43.8575 21.832 44.4786 17.7139 44.4995C13.596 44.5203 9.60979 43.9394 6.47307 42.8725C4.9052 42.3392 3.61479 41.7067 2.63872 41.0161C1.65947 40.3232 1.02275 39.5907 0.71646 38.8661C0.41699 38.1576 0.429989 37.4515 0.744353 36.7517C1.06534 36.0373 1.71361 35.3039 2.72713 34.6039C4.75837 33.201 7.99964 32.1098 11.8972 31.5635"
            stroke="black"
    />

    <path
            class="stroke-2 stroke-{color}"
            d="M17.5 9.68182C19.4013 9.68182 20.9998 11.2676 21 13.2951C21 15.3228 19.4014 16.9094 17.5 16.9094C15.5986 16.9094 14 15.3228 14 13.2951C14.0002 11.2676 15.5987 9.68182 17.5 9.68182Z"
            stroke="black"
            fill="black"
    />

</g>
