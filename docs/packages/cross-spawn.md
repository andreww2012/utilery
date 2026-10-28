# Package: [`cross-spawn`](https://npmx.dev/cross-spawn)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                     | Status | Our function group and name | Notes                                                                                                           |
| -------------------------------------------------------------------- | ------ | --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`spawn`](https://github.com/moxystudio/node-cross-spawn#usage)      | ❌     | -                           | `server/exec` uses its command parsing to run `.cmd` and `.bat` launchers and scripts with a shebang on Windows |
| [`spawn.sync`](https://github.com/moxystudio/node-cross-spawn#usage) | ❌     | -                           | Same                                                                                                            |

> **Note:** Our bundled copy uses our bundled [`which`](./which.md) (v7.0.0) instead of v2, so that only one copy of `which` and `isexe` is bundled.
> It only calls `which.sync`, which works the same in both versions.
