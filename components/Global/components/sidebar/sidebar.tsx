"use client"

import React, { createContext, useContext, useState } from "react"
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react"
import { cn } from "./utils"

export interface SidebarLinkItem<T extends string = string> {
  id: T
  label: string
  icon: React.ReactNode
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider")
  return context
}

function SidebarProvider({
  children,
  open: controlledOpen,
  setOpen: setControlledOpen,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = setControlledOpen ?? setInternalOpen

  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

interface AppSidebarProps<T extends string = string> {
  links: SidebarLinkItem<T>[]
  secondaryLinks?: SidebarLinkItem<T>[]
  activeItem: T
  onItemChange: (item: T) => void
  brandLabel?: string
  className?: string
  renderBottom?: (state: { expanded: boolean }) => React.ReactNode
  renderTop?: (state: { expanded: boolean }) => React.ReactNode
}

export function AppSidebar<T extends string = string>({
  links,
  secondaryLinks = [],
  activeItem,
  onItemChange,
  brandLabel = "PeopleSync",
  className,
  renderBottom,
  renderTop,
}: AppSidebarProps<T>) {
  return (
    <SidebarProvider>
      <DesktopSidebar
        activeItem={activeItem}
        brandLabel={brandLabel}
        className={className}
        links={links}
        onItemChange={onItemChange}
        renderBottom={renderBottom}
        renderTop={renderTop}
        secondaryLinks={secondaryLinks}
      />
      <MobileSidebar
        activeItem={activeItem}
        brandLabel={brandLabel}
        links={links}
        onItemChange={onItemChange}
        renderBottom={renderBottom}
        renderTop={renderTop}
        secondaryLinks={secondaryLinks}
      />
    </SidebarProvider>
  )
}

function DesktopSidebar<T extends string>({
  links,
  secondaryLinks,
  activeItem,
  onItemChange,
  brandLabel,
  className,
  renderBottom,
  renderTop,
}: AppSidebarProps<T> & { secondaryLinks: SidebarLinkItem<T>[] }) {
  const { open, setOpen } = useSidebar()

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        "relative z-30 hidden h-full shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[8px_0_24px_-22px_rgba(15,23,42,0.45)] transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-white/10 dark:bg-[#242424] dark:text-white dark:shadow-black/30 md:flex",
        open ? "w-[312px]" : "w-[68px]",
        className,
      )}
    >
      <SidebarContent
        activeItem={activeItem}
        brandLabel={brandLabel ?? "PeopleSync"}
        links={links}
        onItemChange={onItemChange}
        renderBottom={renderBottom}
        renderTop={renderTop}
        secondaryLinks={secondaryLinks}
      />
    </aside>
  )
}

function MobileSidebar<T extends string>({
  links,
  secondaryLinks,
  activeItem,
  onItemChange,
  brandLabel,
  renderBottom,
  renderTop,
}: AppSidebarProps<T> & { secondaryLinks: SidebarLinkItem<T>[] }) {
  const { open, setOpen } = useSidebar()

  return (
    <>
      <div className="flex h-16 w-full items-center justify-between border-b border-sidebar-border bg-sidebar px-5 text-sidebar-foreground shadow-sm dark:border-white/10 dark:bg-[#242424] dark:text-white md:hidden">
        <Logo compact={false} label={brandLabel ?? "PeopleSync"} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <Menu size={22} />
        </button>
      </div>

      {open ? (
        <>
          <button
            aria-label="Fechar menu"
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] md:hidden"
          />
          <aside className="animate-slide-in-left fixed inset-y-0 left-0 z-50 w-[312px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl dark:border-white/10 dark:bg-[#242424] dark:text-white md:hidden">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <X size={21} />
            </button>
            <SidebarContent
              activeItem={activeItem}
              brandLabel={brandLabel ?? "PeopleSync"}
              links={links}
              mobile
              onItemChange={(item) => {
                onItemChange(item)
                setOpen(false)
              }}
              renderBottom={renderBottom}
              renderTop={renderTop}
              secondaryLinks={secondaryLinks}
            />
          </aside>
        </>
      ) : null}
    </>
  )
}

function SidebarContent<T extends string>({
  mobile = false,
  links,
  secondaryLinks,
  activeItem,
  onItemChange,
  brandLabel,
  renderBottom,
  renderTop,
}: {
  mobile?: boolean
  links: SidebarLinkItem<T>[]
  secondaryLinks: SidebarLinkItem<T>[]
  activeItem: T
  onItemChange: (item: T) => void
  brandLabel: string
  renderBottom?: (state: { expanded: boolean }) => React.ReactNode
  renderTop?: (state: { expanded: boolean }) => React.ReactNode
}) {
  const { open } = useSidebar()
  const expanded = mobile || open

  return (
    <div className="flex h-full flex-col px-[14px] py-5">
      <Logo compact={!expanded} label={brandLabel} />

      {renderTop ? <div className="mt-5">{renderTop({ expanded })}</div> : null}

      <nav className="mt-5 flex flex-1 flex-col">
        <SidebarGroup activeItem={activeItem} expanded={expanded} links={links} onItemChange={onItemChange} />

        {secondaryLinks.length ? (
          <>
            <div className={cn("my-[18px] h-px bg-sidebar-border transition-all dark:bg-white/10", expanded ? "w-full" : "w-10")} />
            <SidebarGroup activeItem={activeItem} expanded={expanded} links={secondaryLinks} onItemChange={onItemChange} />
          </>
        ) : null}
      </nav>

      {renderBottom ? <div className="mt-5">{renderBottom({ expanded })}</div> : null}
    </div>
  )
}

function SidebarGroup<T extends string>({
  links,
  expanded,
  activeItem,
  onItemChange,
}: {
  links: SidebarLinkItem<T>[]
  expanded: boolean
  activeItem: T
  onItemChange: (item: T) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <SidebarLink
          active={activeItem === link.id}
          expanded={expanded}
          key={link.id}
          link={link}
          onClick={() => onItemChange(link.id)}
        />
      ))}
    </div>
  )
}

function SidebarLink<T extends string>({
  link,
  expanded,
  active,
  onClick,
}: {
  link: SidebarLinkItem<T>
  expanded: boolean
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={!expanded ? link.label : undefined}
      className={cn(
        "group flex h-10 w-full items-center rounded-md px-3 text-[14px] font-normal transition-colors duration-150",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground dark:bg-white/[0.09] dark:text-white"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground dark:text-neutral-200 dark:hover:bg-white/[0.06] dark:hover:text-white",
      )}
    >
      <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center transition-colors", active ? "text-sidebar-primary dark:text-white" : "text-sidebar-foreground/55 group-hover:text-sidebar-foreground dark:text-neutral-300 dark:group-hover:text-white")}>
        {link.icon}
      </span>

      <span
        className={cn(
          "ml-3 whitespace-nowrap transition-[opacity,transform] duration-150",
          expanded ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-1.5 opacity-0",
        )}
      >
        {link.label}
      </span>
    </button>
  )
}

function Logo({ compact, label }: { compact: boolean; label: string }) {
  return (
    <div className="flex h-8 items-center px-2">
      <div className="flex h-[22px] w-[24px] shrink-0 items-center justify-center rounded-[6px] bg-sidebar-primary text-sidebar-primary-foreground dark:bg-white dark:text-[#242424]">
        {compact ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
      </div>
      <span
        className={cn(
          "ml-[9px] whitespace-nowrap text-[14px] font-semibold text-sidebar-foreground transition-[opacity,transform] duration-150 dark:text-white",
          compact ? "pointer-events-none -translate-x-1.5 opacity-0" : "translate-x-0 opacity-100",
        )}
      >
        {label}
      </span>
    </div>
  )
}
