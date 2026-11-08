# ビジュアライザーをGitHub Pagesで公開する

同じリポジトリに論文とビジュアライザーを保存し、`docs`フォルダをWebサイトとして配信します。論文はリポジトリのREADMEから読めます。

## 初回に行うこと

1. GitHub Desktopで今回の変更を **Commit → Push origin** します。
2. [このリポジトリのPages設定](https://github.com/O0o-Yuta-Kimura-o0O/my-math-paper-2026_1.5.x/settings/pages)を開きます。
3. **Build and deployment → Source → Deploy from a branch** を選びます。
4. **Branch: main**、フォルダ **/docs** を選び、**Save** を押します。
5. デプロイが完了すると設定画面に公開URLが表示されます。反映には数分かかることがあります。失敗した場合はリポジトリの **Actions** でPagesの実行結果を確認できます。

[GitHub公式の設定手順](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 公開後のURL

- [常に最新版を開く入口](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/)
- [v1.5.8.4を指定するURL](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/f-generative-atlas-v1.5.8.4.html)

SNSには通常、最新版の入口を使えます。特定の版を参照したい場合は版付きURLを使います。初回の公開設定とデプロイが済むまでは、これらのURLは利用できません。

## ファイルと今後の更新

- `docs/index.html`：v1.5.8.4を基にしたビジュアライザーの入口。数学実験室へのリンクも設けています。
- `docs/f-generative-atlas-v1.5.8.4.html`：その版を固定して参照するためのHTML。
- `docs/.nojekyll`：HTMLをそのまま配信するための指定。

版付きHTMLはCSS・JavaScriptを内包した単独ファイルです。最新版の入口は、言語設定用の共有モジュール`docs/language-preference.mjs`も読み込みます。外部ライブラリやバックエンドは不要です。最新版の入口と実験室はPagesまたはローカルHTTPサーバーで開いてください。HTMLソースをGitHubで開くとコードが表示されます。

今後は新しい版付きHTMLを追加し、その内容で`index.html`を更新してCommit・Pushします。既存の版付きファイルを残せば、SNSからの過去のリンクも維持できます。Pagesの設定は通常、一度だけで済みます。

作業元の`release.json`に配布対象を記録し、`scripts/package-release.mjs`がサイト用ファイルも`output`へ複製します。次の版を用意する際は、作業元の`docs`、版の記録、READMEのリンクを更新してから配布物を再生成し、公開済みの版を削除せず同期フォルダへ反映します。

## English setup

Commit and push the prepared changes. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/docs**, and click **Save**. Wait for the Pages deployment to succeed. The stable URL above opens the current atlas; the versioned URL preserves a specific release. Future updates require replacing `docs/index.html`, adding the new versioned HTML, and pushing the changes while retaining previously published versions.

## 数学実験室 v1.5.8.0

[数学実験室](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/lab/)を同じPagesサイトの`lab/`へ追加しました。既存の`main`・`/docs`設定で配信されるため、公開元の再設定は不要です。固定版は`lab/v1.5.8.0/`です。計算モジュールとWorkerを使うため、ローカルでは[手順](docs/lab/README.md)に従いHTTPで配信してください。

## 言語の初期表示

数学実験室とビジュアライザーは、ブラウザの最優先言語が日本語なら日本語、それ以外はEnglishで開始します。手動選択をサイト内だけに記憶して優先します。外部の国判定サービスは使いません。通常の実験室URLへ付けた`?lang=ja`や`?lang=en`も版付きURLへ引き継ぎます。
