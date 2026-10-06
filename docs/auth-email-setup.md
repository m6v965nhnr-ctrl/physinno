# 認証メール(パスワード再設定)の設定

Supabase の標準のメール送信は、実在のユーザーへは送れない(送信数にも厳しい上限がある)ため、
Gmail(通知メールと同じ送信元)を SMTP として設定する。コードの変更は不要で、Supabase の画面で設定する。

## 1. SMTP の設定
Supabase → プロジェクト `relight-tokyo` → Authentication → **Emails** → **SMTP Settings**
https://supabase.com/dashboard/project/lfpbrdwfzxdmdayudxxn/auth/smtp

| 項目 | 値 |
| --- | --- |
| Enable custom SMTP | オン |
| Sender email | `bupapabupapa7@gmail.com` |
| Sender name | `Re:light` |
| Host | `smtp.gmail.com` |
| Port number | `465` |
| Minimum interval between emails | `60` 秒 |
| Username | `bupapabupapa7@gmail.com` |
| Password | Gmail の**アプリパスワード**(通知メールと同じもの) |

## 2. メールの文面(日本語)
Authentication → Emails → Templates → **Reset password**(カスタムSMTPをオンにすると編集できる)

件名:
```
【Re:light】パスワードの再設定
```

本文(HTML):
```html
<h2>パスワードの再設定</h2>
<p>Re:light のパスワードの再設定を受け付けました。下のリンクから、新しいパスワードを設定してください。</p>
<p><a href="{{ .ConfirmationURL }}">パスワードを再設定する</a></p>
<p>このリンクの有効期限は1時間です。</p>
<p>心当たりがない場合は、このメールは破棄してください。パスワードは変わりません。</p>
<p>Re:light</p>
```

## 3. リダイレクト先
Authentication → URL Configuration の Redirect URLs に `https://relight-1wet.vercel.app/**` が入っていること(設定済み)。

## 4. 動作確認
https://relight-1wet.vercel.app/forgot-password に、登録済みのメールアドレスを入れて送信 → メールのリンクから新しいパスワードを設定。
