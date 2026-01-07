import { join } from 'path'
import { skeleton } from '@skeletonlabs/tw-plugin';
import type { Config } from 'tailwindcss';

const config = {
    darkMode: 'class',
    content: [
        './src/**/*.{html,js,svelte,ts}',
        join(require.resolve(
            '@skeletonlabs/tw-plugin'),
            '../**/*.{html,js,svelte,ts}'
        )
    ],
    theme: {
        extend: {},
    },
    plugins: [
        skeleton({
            themes: { preset: ["hamlindigo"] }
        })
    ]
} satisfies Config;

export default config;
