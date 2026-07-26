// The Instagram-post mirror card, reused at full size in the configurator and
// scaled down as a thumbnail in the cart.
const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' }

const HeartFilled = ({ size = 24, color = '#ed4956' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" /></svg>
)
const CommentIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line}><path d="M20.66 17.01A9.99 9.99 0 1 0 17.07 20.62L22 22Z" /></svg>
)
const RepostIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line}><path d="M17 1.5 21 5.5 17 9.5" /><path d="M3 11.5v-2a4 4 0 0 1 4-4h14" /><path d="M7 22.5 3 18.5 7 14.5" /><path d="M21 12.5v2a4 4 0 0 1-4 4H3" /></svg>
)
const ShareIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line}><line x1="22" y1="3" x2="9.22" y2="10.08" /><polygon points="11.7,20.33 22,3 2,3 9.22,10.08" /></svg>
)
const BookmarkFilled = ({ size = 24, color = '#c9f31d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M6 2h12a1 1 0 0 1 1 1v18.6l-7-4.95-7 4.95V3a1 1 0 0 1 1-1z" /></svg>
)
const VerifiedBadge = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40"><path fill="#0095F6" d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h6.234L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.253v-6.235L40 25.359 36.905 20 40 14.641l-5.157-2.981V5.15h-6.376L25.358 0z" /><path fill="#fff" d="m16.132 26.174-4.79-4.868 1.696-1.674 3.094 3.14 6.809-6.848 1.712 1.657z" /></svg>
)
const DotsIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.55" /><circle cx="12" cy="12" r="1.55" /><circle cx="19" cy="12" r="1.55" /></svg>
)
const HomeIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line}><path d="M3 11.2 12 3.5l9 7.7" /><path d="M5 9.8V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.8" /></svg>
)
const SearchIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth="2"><circle cx="10.5" cy="10.5" r="7.3" /><line x1="16" y1="16" x2="21" y2="21" /></svg>
)
const ReelsIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth="1.8"><rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.2" /><line x1="7" y1="2.6" x2="10" y2="7.6" /><line x1="13" y1="2.6" x2="16" y2="7.6" /><line x1="2.6" y1="7.6" x2="21.4" y2="7.6" /><path d="M10 10.6v5l4.3-2.5z" fill="currentColor" stroke="none" /></svg>
)
const PersonIcon = ({ size = 25 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line}><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></svg>
)

export default function MirrorPreview({
  username = 'afacerea.ta',
  verified = true,
  dark = false,
  avatar = '',
  likes = '0',
  comments = '0',
  reposts = '0',
  shares = '0',
  caption = '',
  hashtags = '',
  ledHex = '#FFC98A',
}) {
  const postBg = dark ? '#000000' : '#ffffff'
  const postText = dark ? '#f5f5f5' : '#000000'
  const postBorder = dark ? '#262626' : '#efefef'
  const postBodyBorder = dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)'
  const avatarBg = dark ? '#262626' : '#efefef'
  const avatarText = dark ? '#dddddd' : '#333333'

  return (
    <div style={{ position: 'relative', width: '100%', background: postBg, borderRadius: '44px', overflow: 'hidden', border: postBodyBorder, boxShadow: '0 0 44px 2px ' + ledHex + '55, 0 30px 55px -20px rgba(0,0,0,0.5)', transition: 'background 0.35s ease' }}>
      {/* Post header (avatar + username + menu) */}
      <div style={{ padding: '16px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {avatar
              ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: '13px', fontWeight: '700', color: avatarText, textTransform: 'uppercase' }}>{username.slice(0, 2)}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
            <span style={{ fontSize: '19px', fontWeight: '700', color: postText, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{username}</span>
            {verified && <VerifiedBadge size={17} />}
          </div>
        </div>
        <div style={{ color: postText, flexShrink: 0, paddingLeft: '8px' }}><DotsIcon /></div>
      </div>

      {/* Mirror surface (the real reflective glass) */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.16', background: 'linear-gradient(158deg, #cfe1f0 0%, #eef5fb 46%, #b9cee1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 60%)' }} />
        <span style={{ position: 'relative', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>reflectia ta</span>
      </div>

      {/* Action bar: four inline stats + saved */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '13px 13px 5px', color: postText }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', marginRight: '11px', whiteSpace: 'nowrap' }}><HeartFilled size={21} /><span style={{ fontSize: '12px', fontWeight: '700' }}>{likes} likes</span></span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '10px', whiteSpace: 'nowrap' }}><CommentIcon size={20} /><span style={{ fontSize: '12px', fontWeight: '700' }}>{comments}</span></span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '10px', whiteSpace: 'nowrap' }}><RepostIcon size={20} /><span style={{ fontSize: '12px', fontWeight: '700' }}>{reposts}</span></span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}><ShareIcon size={19} /><span style={{ fontSize: '12px', fontWeight: '700' }}>{shares}</span></span>
        <span style={{ marginLeft: 'auto', paddingLeft: '6px' }}><BookmarkFilled size={21} /></span>
      </div>

      {/* Caption + hashtags */}
      <div style={{ padding: '5px 16px 2px', fontSize: '14px', color: postText, lineHeight: '1.4' }}>
        <span style={{ fontWeight: '700' }}>{username}</span>{'  '}
        <span style={{ fontStyle: 'italic' }}>{caption}</span>
      </div>
      <div style={{ padding: '3px 16px 14px', fontSize: '14px', fontStyle: 'italic', color: postText }}>{hashtags}</div>

      {/* Bottom nav */}
      <div style={{ borderTop: '1px solid ' + postBorder, padding: '12px 22px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: postText }}>
        <HomeIcon /><ReelsIcon /><ShareIcon size={24} /><SearchIcon /><PersonIcon />
      </div>
    </div>
  )
}
