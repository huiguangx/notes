import * as React from 'react'
import Giscus from '@giscus/react'

const id = 'inject-comments'

// 获取 localStorage 中 theme 的值
function getSavedTheme() {
  console.log(localStorage.getItem('theme'))
  return localStorage.getItem('theme')
}

// 获取系统主题
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const Comments = () => {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => {
    const theme = getSavedTheme() || getSystemTheme()
    setTheme(theme)
    // 监听主题变化
    const observer = new MutationObserver(() => {
      setTheme(getSavedTheme())
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    // 取消监听
    return () => {
      observer.disconnect()
    }
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {mounted ? (
        <Giscus
          id={id}
          repo="huiguangx/notes"
          repoId="R_kgDOL9Uurg"
          category="Announcements"
          categoryId="DIC_kwDOL9Uurs4Cfc35"
          mapping="title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
          theme={theme}
        />
      ) : null}
    </div>
  )
}

export default Comments