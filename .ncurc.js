// @ts-check
import {ncuConfig} from '@andreww2012/npm-check-updates-config';
import packageJson from './package.json' with {type: 'json'};

export default ncuConfig({
  cwd: import.meta.dirname,
  targets: {
    // Their `latest` dist-tag lags behind the prerelease channel we actually follow
    'all-contributors-cli': 'greatest',
    'eslint-config-un': 'greatest',
  },
  groups: {
    'Bundled utilities': {
      // Also has the packages they depend on, which ncu doesn't check
      packages: Object.keys(packageJson.inlinedDependencies),
      icon: '🧩',
      priority: 0,
    },
  },
});
