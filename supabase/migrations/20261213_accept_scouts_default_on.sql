-- スカウトの受け付けを、基本オンにする（設定で自分でオフにできる）
-- これまでは初期値オフで、オンにしたPTが0人＝採用側がスカウトを送れなかった
alter table public.pt_profiles alter column accept_scouts set default true;

-- 既存のPTも、全員オンに切り替える（全員が初期値のままで、自分でオフを選んだ人はいない。
-- 学生はもともとスカウトの対象外（RLS・RPCで除外）なので、値がtrueでも影響しない）
update public.pt_profiles set accept_scouts = true where not accept_scouts;
