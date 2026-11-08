# Manifeste de migration — @tryatlas/design 0.1.15 → @tryatlas/design-svelte

Généré le 2026-11-08T17:47:26.694Z depuis `/Users/maximebuffet/Documents/design` au SHA `0f4399832d06bc3558d35d5a96d6557f33d412b1`.

## Couverture

| Contrat | Total | Portés | Vérifiés | Non portés |
|---|---:|---:|---:|---:|
| Exports publics | 758 | 602 | 22 | 156 |
| Stories | 853 | 853 | 39 | 0 |

## Exports (racine, variantes, thème, session, blocs, animations, ratchet)

| Export | Entrées | Source | Svelte | Statut | Stories | Tests |
|---|---|---|---|---|---|---|
| `Accordion` | . | src/index.ts | ./accordion.svelte | porté | 6 | — |
| `AccordionContent` | . | src/index.ts | ./accordion-content.svelte | porté | 6 | — |
| `AccordionItem` | . | src/index.ts | ./accordion-item.svelte | porté | 6 | — |
| `AccordionTrigger` | . | src/index.ts | ./accordion-trigger.svelte | porté | 6 | — |
| `activateHintTarget` | . | src/index.ts | — | non porté | 0 | — |
| `ACTOR_COLOUR_HUE` | . | src/index.ts | — | non porté | 0 | — |
| `actorHue` | . | src/index.ts | — | non porté | 0 | — |
| `agentFamily` | . | src/index.ts | ./model-family | porté | 7 | — |
| `AgentItem` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `AgentMonogram` | . | src/index.ts | ./agent-monogram.svelte | porté | 3 | — |
| `AI21Mark` | . | src/index.ts | ./provider-marks/ai21-mark.svelte | porté | 3 | — |
| `AlertDialog` | . | src/index.ts | ./alert-dialog.svelte | porté | 6 | — |
| `AlertDialogAction` | . | src/index.ts | ./alert-dialog-action.svelte | porté | 6 | — |
| `AlertDialogCancel` | . | src/index.ts | ./alert-dialog-cancel.svelte | porté | 6 | — |
| `AlertDialogContent` | . | src/index.ts | ./alert-dialog-content.svelte | porté | 6 | — |
| `AlertDialogDescription` | . | src/index.ts | ./alert-dialog-description.svelte | porté | 6 | — |
| `AlertDialogFooter` | . | src/index.ts | ./alert-dialog-footer.svelte | porté | 6 | — |
| `AlertDialogHeader` | . | src/index.ts | ./alert-dialog-header.svelte | porté | 6 | — |
| `AlertDialogOverlay` | . | src/index.ts | ./alert-dialog-overlay.svelte | porté | 6 | — |
| `AlertDialogPortal` | . | src/index.ts | ./alert-dialog-portal.svelte | porté | 6 | — |
| `AlertDialogTitle` | . | src/index.ts | ./alert-dialog-title.svelte | porté | 6 | — |
| `AlertDialogTrigger` | . | src/index.ts | ./alert-dialog-trigger.svelte | porté | 6 | — |
| `alphaOf` | ./theme | src/theme/index.ts | ./values | porté | 0 | — |
| `ANSI_BG_CLASS` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `ANSI_NAMES` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `ANSI_TEXT_CLASS` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `AnsiIndex` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `AnthropicMark` | . | src/index.ts | ./deps/anthropic-mark.svelte | porté | 9 | — |
| `Appearance` | ., ./theme, ./blocks | src/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `AppFrame` | . | src/index.ts | ./layout/app-frame.svelte | porté | 7 | — |
| `AppFrameInset` | . | src/index.ts | ./layout/app-frame | porté | 0 | — |
| `AppShell` | . | src/index.ts | ./shell/app-shell.svelte | porté | 8 | — |
| `ATLAS_PREFIX_RULE` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `AtlasBadge` | . | src/index.ts | ./atlas-badge.svelte | porté | 7 | — |
| `AtlasBadgeTone` | . | src/index.ts | ./atlas-badge.svelte | porté | 0 | — |
| `AtlasMark` | . | src/index.ts | ./atlas-mark.svelte | porté | 26 | — |
| `AtlasWordmark` | . | src/index.ts | ./atlas-wordmark.svelte | porté | 7 | — |
| `AttachmentView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `AuthAsideCopy` | . | src/index.ts | ./shell/auth-aside-copy.svelte | porté | 5 | — |
| `AuthAsideNote` | . | src/index.ts | ./shell/auth-aside-note.svelte | porté | 5 | — |
| `AuthSplit` | . | src/index.ts | ./shell/auth-split.svelte | porté | 5 | — |
| `Avatar` | . | src/index.ts | ./avatar.svelte | porté | 33 | — |
| `AvatarFallback` | . | src/index.ts | ./avatar-fallback.svelte | porté | 33 | — |
| `AvatarGroup` | . | src/index.ts | ./avatar-group.svelte | porté | 6 | — |
| `AvatarGroupCount` | . | src/index.ts | ./avatar-group-count.svelte | porté | 6 | — |
| `AvatarImage` | . | src/index.ts | ./avatar-image.svelte | porté | 6 | — |
| `AvatarStack` | . | src/index.ts | ./avatar-stack.svelte | porté | 5 | — |
| `AzureMark` | . | src/index.ts | ./provider-marks/azure-mark.svelte | porté | 3 | — |
| `Badge` | ., ./variants | src/index.ts | src/ui/badge.svelte | vérifié | 35 | tests/primitives.test.ts |
| `BadgeProps` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `badgeVariants` | ., ./variants | src/index.ts | src/ui/badge-variants.ts | porté | 0 | — |
| `BASE_RULE_REGISTRY` | ./theme | src/theme/index.ts | ../../theme/theme-key-registry | porté | 1 | — |
| `BaseRule` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `BellGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `BlockSplit` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `BlurEdge` | ., ./blocks | src/index.ts | ./blocks/gradual-blur.svelte | porté | 0 | — |
| `BodyLoad` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `BrandMarkProps` | . | src/index.ts | ./deps/brand-mark-svg.svelte | porté | 0 | — |
| `Breadcrumb` | . | src/index.ts | ./breadcrumb.svelte | porté | 5 | — |
| `BreadcrumbEllipsis` | . | src/index.ts | ./breadcrumb-ellipsis.svelte | porté | 5 | — |
| `BreadcrumbItem` | . | src/index.ts | ./breadcrumb-item.svelte | porté | 5 | — |
| `BreadcrumbLink` | . | src/index.ts | ./breadcrumb-link.svelte | porté | 5 | — |
| `BreadcrumbList` | . | src/index.ts | ./breadcrumb-list.svelte | porté | 5 | — |
| `BreadcrumbPage` | . | src/index.ts | ./breadcrumb-page.svelte | porté | 5 | — |
| `BreadcrumbSeparator` | . | src/index.ts | ./breadcrumb-separator.svelte | porté | 5 | — |
| `Button` | . | src/index.ts | src/ui/button.svelte | vérifié | 267 | tests/primitives.test.ts |
| `ButtonProps` | . | src/index.ts | — | non porté | 0 | — |
| `buttonVariants` | ., ./variants | src/index.ts | src/ui/button-variants.ts | vérifié | 0 | tests/primitives.test.ts |
| `CalendarDay` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ./blocks/timeline-calendar.svelte | porté | 0 | — |
| `CalendarItem` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ./blocks/timeline-calendar.svelte | porté | 8 | — |
| `Callout` | . | src/index.ts | ./callout.svelte | porté | 11 | — |
| `calloutVariants` | ., ./variants | src/index.ts | ./callout-variants | porté | 11 | — |
| `CANVAS_EXPORT_FORMATS` | . | src/index.ts | ./canvas/canvas-action-pill.svelte | porté | 13 | — |
| `CANVAS_FIELD_CLASS` | . | src/index.ts | ./canvas/canvas-nodes-shared | porté | 13 | — |
| `CANVAS_GLASS` | . | src/index.ts | src/lots/f6-canvas-code/canvas/canvas-chrome.ts | porté | 0 | — |
| `CanvasActionPill` | . | src/index.ts | ./canvas/canvas-action-pill.svelte | porté | 13 | — |
| `CanvasAnchor` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasBounds` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasCorner` | . | src/index.ts | src/lots/f6-canvas-code/canvas/canvas-chrome.ts | porté | 0 | — |
| `CanvasDock` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasDraftBox` | . | src/index.ts | ./canvas/canvas-draft-box.svelte | porté | 1 | — |
| `CanvasExportFormat` | . | src/index.ts | ./canvas/canvas-action-pill.svelte | porté | 0 | — |
| `CanvasFrame` | . | src/index.ts | ./canvas/canvas-frame.svelte | porté | 17 | — |
| `CanvasHeaderPill` | . | src/index.ts | ./canvas/canvas-header-pill.svelte | porté | 14 | — |
| `CanvasLinkStatus` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasMedia` | . | src/index.ts | ./canvas/canvas-media.svelte | porté | 17 | — |
| `CanvasMinimap` | . | src/index.ts | ./canvas/canvas-minimap.svelte | porté | 6 | — |
| `CanvasNodeFrame` | . | src/index.ts | ./canvas/canvas-node-frame.svelte | porté | 17 | — |
| `CanvasNodeKind` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasNote` | . | src/index.ts | ./canvas/canvas-note.svelte | porté | 17 | — |
| `CanvasPageAuthor` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasPageDropIndicator` | . | src/index.ts | ./canvas/canvas-pages-panel.svelte | porté | 18 | — |
| `CanvasPageRow` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasPageRowAction` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasPagesPanel` | . | src/index.ts | ./canvas/canvas-pages-panel.svelte | porté | 22 | — |
| `CanvasPill` | . | src/index.ts | ./canvas/canvas-pill.svelte | porté | 1 | — |
| `CanvasPillButton` | . | src/index.ts | ./canvas/canvas-pill-button.svelte | porté | 1 | — |
| `CanvasPillDivider` | . | src/index.ts | ./canvas/canvas-pill-divider.svelte | porté | 1 | — |
| `CanvasShape` | . | src/index.ts | ./canvas/canvas-shape.svelte | porté | 17 | — |
| `CanvasShapeKind` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `CanvasStatusChip` | . | src/index.ts | ./canvas/canvas-status-chip.svelte | porté | 5 | — |
| `CanvasSurface` | . | src/index.ts | ./canvas/canvas-surface.svelte | porté | 48 | — |
| `CanvasText` | . | src/index.ts | ./canvas/canvas-text.svelte | porté | 17 | — |
| `CanvasToolbar` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 11 | — |
| `CanvasToolItem` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 7 | — |
| `CerebrasMark` | . | src/index.ts | ./provider-marks/cerebras-mark.svelte | porté | 3 | — |
| `Checkbox` | . | src/index.ts | ./checkbox.svelte | porté | 20 | — |
| `CheckpointTrace` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace.svelte | porté | 19 | — |
| `CheckpointTraceProps` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace.svelte | porté | 19 | — |
| `CheckpointView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `clampUiScale` | . | src/index.ts | — | non porté | 0 | — |
| `ClaudeCodeMark` | . | src/index.ts | ./claude-code-mark.svelte | porté | 27 | — |
| `ClaudeMark` | . | src/index.ts | ./claude-mark.svelte | porté | 17 | — |
| `cn` | ., ./variants | src/index.ts | src/lib/utils.ts | vérifié | 44 | tests/primitives.test.ts |
| `Code` | . | src/index.ts | ./code.svelte | porté | 22 | — |
| `CodeFence` | . | src/index.ts | ./code-fence.svelte | porté | 7 | — |
| `CodexMark` | . | src/index.ts | ./codex-mark.svelte | porté | 27 | — |
| `CohereMark` | . | src/index.ts | ./provider-marks/cohere-mark.svelte | porté | 3 | — |
| `CollapsedSegment` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `collapseSegments` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `Collapsible` | . | src/index.ts | ./collapsible.svelte | porté | 4 | — |
| `CollapsibleContent` | . | src/index.ts | ./collapsible-content.svelte | porté | 4 | — |
| `CollapsibleTrigger` | . | src/index.ts | ./collapsible-trigger.svelte | porté | 4 | — |
| `ColorHueSlider` | . | src/index.ts | ./color-hue-slider.svelte | porté | 4 | — |
| `ColorSaturationValuePlane` | . | src/index.ts | ./color-saturation-value-plane.svelte | porté | 4 | — |
| `colorToCss` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `ColorTransform` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `Column` | . | src/index.ts | ./data-table-types | porté | 7 | — |
| `Combobox` | . | src/index.ts | ./combobox.svelte | porté | 12 | — |
| `ComboboxChip` | . | src/index.ts | ./combobox-chip.svelte | porté | 12 | — |
| `ComboboxChips` | . | src/index.ts | ./combobox-chips.svelte | porté | 12 | — |
| `ComboboxChipsInput` | . | src/index.ts | ./combobox-chips-input.svelte | porté | 12 | — |
| `ComboboxCollection` | . | src/index.ts | ./combobox-collection.svelte | porté | 12 | — |
| `ComboboxContent` | . | src/index.ts | ./combobox-content.svelte | porté | 12 | — |
| `ComboboxEmpty` | . | src/index.ts | ./combobox-empty.svelte | porté | 12 | — |
| `ComboboxGroup` | . | src/index.ts | ./combobox-group.svelte | porté | 12 | — |
| `ComboboxInput` | . | src/index.ts | ./combobox-input.svelte | porté | 12 | — |
| `ComboboxItem` | . | src/index.ts | ./combobox-item.svelte | porté | 12 | — |
| `ComboboxLabel` | . | src/index.ts | ./combobox-label.svelte | porté | 12 | — |
| `ComboboxList` | . | src/index.ts | ./combobox-list.svelte | porté | 12 | — |
| `ComboboxSeparator` | . | src/index.ts | ./combobox-separator.svelte | porté | 12 | — |
| `ComboboxTrigger` | . | src/index.ts | ./combobox-trigger.svelte | porté | 12 | — |
| `ComboboxValue` | . | src/index.ts | ./combobox-value.svelte | porté | 12 | — |
| `CommandAction` | . | src/index.ts | ./command-menu.svelte | porté | 6 | — |
| `CommandDialog` | . | src/index.ts | ./command-dialog.svelte | porté | 6 | — |
| `CommandDialogPopup` | . | src/index.ts | ./command-dialog-popup.svelte | porté | 6 | — |
| `CommandEmpty` | . | src/index.ts | ./command-empty.svelte | porté | 6 | — |
| `CommandFooter` | . | src/index.ts | ./command-footer.svelte | porté | 6 | — |
| `CommandFooterHint` | . | src/index.ts | ./command-footer-hint.svelte | porté | 6 | — |
| `CommandGroupLabel` | . | src/index.ts | ./command-group-label.svelte | porté | 6 | — |
| `CommandHints` | . | src/index.ts | — | non porté | 15 | — |
| `CommandInput` | . | src/index.ts | ./command-input.svelte | porté | 6 | — |
| `CommandItem` | . | src/index.ts | ./command-item.svelte | porté | 6 | — |
| `CommandItemIcon` | . | src/index.ts | ./command-item-icon.svelte | porté | 6 | — |
| `CommandList` | . | src/index.ts | — | non porté | 15 | — |
| `CommandMenu` | . | src/index.ts | ./command-menu.svelte | porté | 6 | — |
| `CommandPalette` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteGroup` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteItem` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommandPaletteView` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteViewProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommandPanel` | . | src/index.ts | ./command-panel.svelte | porté | 31 | — |
| `CommandRow` | . | src/index.ts | — | non porté | 15 | — |
| `CommandShortcut` | . | src/index.ts | ./command-shortcut.svelte | porté | 6 | — |
| `CommandSize` | . | src/index.ts | — | non porté | 0 | — |
| `CommandSubmenuChevron` | . | src/index.ts | ./command-submenu-chevron.svelte | porté | 6 | — |
| `CommandSuggestion` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 1 | — |
| `commandSuggestionId` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 0 | — |
| `CommandSuggestions` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 1 | — |
| `CommandSuggestionsProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommentAnchor` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `CommentView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `COMMS_GROUP_WINDOW_MS` | . | src/index.ts | — | non porté | 0 | — |
| `CommsAuthor` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsCallMarker` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsComposerSendState` | . | src/index.ts | ./comms/comms-composer-shell.svelte | porté | 0 | — |
| `CommsComposerShell` | . | src/index.ts | ./comms/comms-composer-shell.svelte | porté | 16 | — |
| `CommsComposerShellProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationKind` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsConversationRow` | . | src/index.ts | ./comms/comms-conversation-row.svelte | porté | 13 | — |
| `CommsConversationRowProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationRowView` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsConversationSelect` | . | src/index.ts | ./comms/comms-conversation-row.svelte | porté | 0 | — |
| `CommsDayDivider` | . | src/index.ts | ./comms/comms-day-divider.svelte | porté | 21 | — |
| `CommsDayDividerProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsMessageRow` | . | src/index.ts | ./comms/comms-message-row.svelte | porté | 21 | — |
| `CommsMessageRowLabels` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `CommsMessageRowPermissions` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `CommsMessageRowProps` | . | src/index.ts | ./comms/comms-message-row.svelte | porté | 0 | — |
| `CommsMessageView` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsReaction` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsReplyRef` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsSendState` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsTranscriptRow` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsUnreadBadge` | . | src/index.ts | — | non porté | 0 | — |
| `CommsUnreadLine` | . | src/index.ts | ./comms/comms-unread-line.svelte | porté | 21 | — |
| `CommsUnreadLineProps` | . | src/index.ts | — | non porté | 0 | — |
| `CompoundFilter` | . | src/index.ts | ./compound-filter.svelte | porté | 5 | — |
| `ContextMenu` | . | src/index.ts | ./context-menu.svelte | porté | 14 | — |
| `ContextMenuCheckboxItem` | . | src/index.ts | ./context-menu-checkbox-item.svelte | porté | 4 | — |
| `ContextMenuContent` | . | src/index.ts | ./context-menu-content.svelte | porté | 14 | — |
| `ContextMenuGroup` | . | src/index.ts | ./dropdown-menu-group.svelte | porté | 4 | — |
| `ContextMenuItem` | . | src/index.ts | ./context-menu-item.svelte | porté | 14 | — |
| `ContextMenuLabel` | . | src/index.ts | ./dropdown-menu-label.svelte | porté | 4 | — |
| `ContextMenuPortal` | . | src/index.ts | — | non porté | 0 | — |
| `ContextMenuRadioGroup` | . | src/index.ts | — | non porté | 0 | — |
| `ContextMenuSeparator` | . | src/index.ts | ./dropdown-menu-separator.svelte | porté | 4 | — |
| `ContextMenuShortcut` | . | src/index.ts | ./context-menu-shortcut.svelte | porté | 4 | — |
| `ContextMenuSub` | . | src/index.ts | ./dropdown-menu-sub.svelte | porté | 4 | — |
| `ContextMenuSubContent` | . | src/index.ts | ./context-menu-sub-content.svelte | porté | 4 | — |
| `ContextMenuSubTrigger` | . | src/index.ts | ./context-menu-sub-trigger.svelte | porté | 4 | — |
| `ContextMenuTrigger` | . | src/index.ts | ./context-menu-trigger.svelte | porté | 14 | — |
| `contrastRatio` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `conversationTitle` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `CopyGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `createToastManager` | . | src/index.ts | ./toast/toast-manager.svelte | porté | 7 | — |
| `CursorAgentMark` | . | src/index.ts | ./cursor-agent-mark.svelte | porté | 8 | — |
| `CursorMark` | . | src/index.ts | ./cursor-mark.svelte | porté | 12 | — |
| `D23_RENAMES` | . | src/index.ts | — | non porté | 0 | — |
| `D23Rename` | . | src/index.ts | — | non porté | 0 | — |
| `DashedRails` | ., ./blocks | src/index.ts | ./blocks/dashed-rails.svelte | porté | 3 | — |
| `DataTable` | . | src/index.ts | ./data-table.svelte | porté | 7 | — |
| `DataTableSort` | . | src/index.ts | ./data-table-types | porté | 7 | — |
| `DeepInfraMark` | . | src/index.ts | ./provider-marks/deep-infra-mark.svelte | porté | 3 | — |
| `DeepSeekMark` | . | src/index.ts | ./provider-marks/deep-seek-mark.svelte | porté | 3 | — |
| `DEFAULT_COMMS_MESSAGE_ROW_LABELS` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `DEFAULT_TOOL_CALL_CARD_LABELS` | ./session | src/session.ts | ./session/tool-call-labels | porté | 0 | — |
| `DEFAULT_TRACE_LABELS` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace.svelte | porté | 0 | — |
| `DefaultDiff` | ./session | src/session.ts | ./session/default-diff.svelte | porté | 16 | — |
| `DefaultDiffProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `defineRatchetSuite` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `DeltaChip` | . | src/index.ts | ./delta-chip.svelte | porté | 8 | — |
| `DeltaTone` | . | src/index.ts | ./delta-chip.svelte | porté | 0 | — |
| `DerivationContext` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DERIVED_VAR_REGISTRY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DerivedVar` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DerivedVarDefinition` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `describeDerivation` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DetailPane` | . | src/index.ts | ./shell/detail-pane.svelte | porté | 5 | — |
| `detectKeyPlatform` | . | src/index.ts | — | non porté | 0 | — |
| `Dialog` | . | src/index.ts | src/ui/dialog/dialog.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogClose` | . | src/index.ts | src/ui/dialog/dialog-close.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogContent` | . | src/index.ts | src/ui/dialog/dialog-content.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogContentSize` | . | src/index.ts | — | non porté | 0 | — |
| `DialogContentVariant` | . | src/index.ts | — | non porté | 0 | — |
| `DialogDescription` | . | src/index.ts | src/ui/dialog/dialog-description.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogFooter` | . | src/index.ts | src/ui/dialog/dialog-footer.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogHeader` | . | src/index.ts | src/ui/dialog/dialog-header.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogOverlay` | . | src/index.ts | — | non porté | 0 | — |
| `DialogPortal` | . | src/index.ts | — | non porté | 0 | — |
| `DialogTitle` | . | src/index.ts | src/ui/dialog/dialog-title.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogTrigger` | . | src/index.ts | src/ui/dialog/dialog-trigger.svelte | vérifié | 13 | tests/dialog.test.ts |
| `DiffData` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `DiffStat` | . | src/index.ts | ./diff-stat.svelte | porté | 7 | — |
| `DiscordMark` | . | src/index.ts | ./discord-mark.svelte | porté | 8 | — |
| `DitherField` | ., ./blocks | src/index.ts | ./blocks/dither-field.svelte | porté | 6 | — |
| `DotMatrix` | . | src/index.ts | ./dot-matrix.svelte | porté | 13 | — |
| `DrillInRow` | . | src/index.ts | ./drill-in-row.svelte | porté | 10 | — |
| `DropdownMenu` | . | src/index.ts | ./dropdown-menu.svelte | porté | 7 | — |
| `DropdownMenuCheckboxItem` | . | src/index.ts | ./dropdown-menu-checkbox-item.svelte | porté | 7 | — |
| `DropdownMenuContent` | . | src/index.ts | ./dropdown-menu-content.svelte | porté | 7 | — |
| `DropdownMenuGroup` | . | src/index.ts | ./dropdown-menu-group.svelte | porté | 7 | — |
| `DropdownMenuItem` | . | src/index.ts | ./dropdown-menu-item.svelte | porté | 11 | — |
| `DropdownMenuLabel` | . | src/index.ts | ./dropdown-menu-label.svelte | porté | 7 | — |
| `DropdownMenuPortal` | . | src/index.ts | — | non porté | 0 | — |
| `DropdownMenuRadioGroup` | . | src/index.ts | ./dropdown-menu-radio-group.svelte | porté | 7 | — |
| `DropdownMenuRadioItem` | . | src/index.ts | ./dropdown-menu-radio-item.svelte | porté | 7 | — |
| `DropdownMenuSeparator` | . | src/index.ts | ./dropdown-menu-separator.svelte | porté | 11 | — |
| `DropdownMenuShortcut` | . | src/index.ts | ./dropdown-menu-shortcut.svelte | porté | 11 | — |
| `DropdownMenuSub` | . | src/index.ts | ./dropdown-menu-sub.svelte | porté | 7 | — |
| `DropdownMenuSubContent` | . | src/index.ts | ./dropdown-menu-sub-content.svelte | porté | 7 | — |
| `DropdownMenuSubTrigger` | . | src/index.ts | ./dropdown-menu-sub-trigger.svelte | porté | 7 | — |
| `DropdownMenuTrigger` | . | src/index.ts | ./dropdown-menu-trigger.svelte | porté | 7 | — |
| `EASE_PANEL` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `EditorBreadcrumbs` | . | src/index.ts | ./code-surface/editor-breadcrumbs.svelte | porté | 11 | — |
| `EditorBreadcrumbsProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorFrame` | . | src/index.ts | ./code-surface/editor-frame.svelte | porté | 8 | — |
| `EditorFrameProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorPreview` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 11 | — |
| `EditorPreviewLine` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 0 | — |
| `EditorPreviewProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorPreviewToken` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 0 | — |
| `EditorStatusBar` | . | src/index.ts | ./code-surface/editor-status-bar.svelte | porté | 11 | — |
| `EditorStatusBarProps` | . | src/index.ts | — | non porté | 0 | — |
| `ElevenLabsMark` | . | src/index.ts | ./provider-marks/eleven-labs-mark.svelte | porté | 3 | — |
| `EMPTY_SPLIT` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `EmptyState` | . | src/index.ts | ./empty-state.svelte | porté | 6 | — |
| `ErrorKind` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `ExternalAgentMark` | . | src/index.ts | ./external-agent-mark.svelte | porté | 3 | — |
| `familyOf` | . | src/index.ts | ./model-family | porté | 7 | — |
| `Field` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldContent` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldDescription` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldError` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldGroup` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldLabel` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldLegend` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldSeparator` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldSet` | . | src/index.ts | ./field | porté | 8 | — |
| `FieldTitle` | . | src/index.ts | ./field | porté | 8 | — |
| `filterCommandGroups` | . | src/index.ts | — | non porté | 15 | — |
| `FindBar` | . | src/index.ts | ./code-surface/find-bar.svelte | porté | 14 | — |
| `FindBarProps` | . | src/index.ts | — | non porté | 6 | — |
| `FindFlag` | . | src/index.ts | ./code-surface/find-bar.svelte | porté | 0 | — |
| `FireworksMark` | . | src/index.ts | ./provider-marks/fireworks-mark.svelte | porté | 3 | — |
| `formatBytes` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view-helpers.ts | porté | 0 | — |
| `formatClock` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `formatDayLabel` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `formatDiffCount` | . | src/index.ts | ./format-diff-count | porté | 0 | — |
| `formatDuration` | ., ./session | src/index.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `formatViolations` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `GeminiMark` | . | src/index.ts | ./gemini-mark.svelte | porté | 17 | — |
| `generateHintLabels` | . | src/index.ts | — | non porté | 0 | — |
| `GhostCards` | ., ./blocks | src/index.ts | ./blocks/ghost-cards.svelte | porté | 2 | — |
| `GitHubMark` | . | src/index.ts | ./github-mark.svelte | porté | 17 | — |
| `Globe` | ., ./blocks | src/index.ts | ./blocks/globe.svelte | porté | 21 | — |
| `GlobeMarker` | ., ./blocks | src/index.ts | ./blocks/globe.svelte | porté | 6 | — |
| `GoChevron` | . | src/index.ts | ./go-chevron.svelte | porté | 4 | — |
| `GoogleMark` | . | src/index.ts | ./google-mark.svelte | porté | 16 | — |
| `GradualBlur` | ., ./blocks | src/index.ts | ./blocks/gradual-blur.svelte | porté | 4 | — |
| `GradualBlurProps` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `GroqMark` | . | src/index.ts | ./provider-marks/groq-mark.svelte | porté | 3 | — |
| `hasReferenceDefinitions` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `hexOf` | ./theme | src/theme/index.ts | ./values | porté | 0 | — |
| `highlightRanges` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 24 | — |
| `HighlightSegment` | . | src/index.ts | — | non porté | 0 | — |
| `Hint` | . | src/index.ts | src/ui/hint.svelte | porté | 28 | — |
| `HINT_ALPHABET` | . | src/index.ts | — | non porté | 0 | — |
| `HINT_OVERLAY_ATTR` | . | src/index.ts | — | non porté | 0 | — |
| `HINT_SELECTOR` | . | src/index.ts | — | non porté | 0 | — |
| `HintGroup` | . | src/index.ts | ./hint-group | porté | 3 | — |
| `HintItem` | . | src/index.ts | ./hint-group | porté | 3 | — |
| `HintOverlay` | . | src/index.ts | — | non porté | 4 | — |
| `HintOverlayProps` | . | src/index.ts | — | non porté | 0 | — |
| `HintTarget` | . | src/index.ts | — | non porté | 0 | — |
| `hintTriggerProps` | . | src/index.ts | — | non porté | 0 | — |
| `hrefOf` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `HsvColor` | ./theme | src/theme/index.ts | ./color | porté | 4 | — |
| `hsvToHex` | ./theme | src/theme/index.ts | ./color | porté | 4 | — |
| `HUD` | . | src/index.ts | ./deps/hud | porté | 1 | — |
| `HUE_BG` | . | src/index.ts | — | non porté | 0 | — |
| `HUE_CHIP` | . | src/index.ts | — | non porté | 0 | — |
| `HueDot` | . | src/index.ts | ./hue-dot.svelte | porté | 8 | — |
| `hueFor` | . | src/index.ts | — | non porté | 0 | — |
| `HUES` | . | src/index.ts | ../../lib/hue | porté | 17 | — |
| `HuggingFaceMark` | . | src/index.ts | ./provider-marks/hugging-face-mark.svelte | porté | 3 | — |
| `Icon` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 206 | tests/primitives.test.ts |
| `ICON_SIZES` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 8 | tests/primitives.test.ts |
| `ICON_STROKE_WIDTH` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 1 | tests/primitives.test.ts |
| `IconButton` | . | src/index.ts | src/ui/icon-button.svelte | vérifié | 119 | tests/primitives.test.ts |
| `IconButtonProps` | . | src/index.ts | — | non porté | 0 | — |
| `iconButtonVariants` | ., ./variants | src/index.ts | src/ui/icon-button-variants.ts | porté | 0 | — |
| `IconProps` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `IconSize` | ., ./variants | src/index.ts | src/ui/icon.svelte | porté | 8 | — |
| `INFINITE_ANIMATION_FPS_VAR` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 5 | — |
| `INFINITE_ANIMATIONS` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 1 | — |
| `InfiniteAnimation` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 0 | — |
| `infiniteAnimationFps` | ., ./animations | src/index.ts | — | non porté | 0 | — |
| `InfiniteSlider` | ., ./blocks | src/index.ts | ./blocks/infinite-slider.svelte | porté | 5 | — |
| `InfiniteSliderProps` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `InfoLinks` | . | src/index.ts | ./shell/info-menu.svelte | porté | 5 | — |
| `InfoMenu` | . | src/index.ts | ./shell/info-menu.svelte | porté | 19 | — |
| `initialsOf` | . | src/index.ts | — | non porté | 0 | — |
| `Input` | . | src/index.ts | src/ui/input.svelte | vérifié | 42 | tests/input.test.ts |
| `InputGroup` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupAddon` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupButton` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupInput` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupText` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupTextarea` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputProps` | . | src/index.ts | — | non porté | 0 | — |
| `inputVariants` | ., ./variants | src/index.ts | src/ui/input-variants.ts | vérifié | 0 | tests/input.test.ts |
| `isAt` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `isFocusVisible` | . | src/index.ts | — | non porté | 0 | — |
| `isIncompleteCodeFence` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `isTooltipWarm` | . | src/index.ts | — | non porté | 0 | — |
| `JetBrainsMark` | . | src/index.ts | ./jetbrains-mark.svelte | porté | 8 | — |
| `JinaMark` | . | src/index.ts | ./provider-marks/jina-mark.svelte | porté | 3 | — |
| `Kbd` | . | src/index.ts | src/ui/kbd.svelte | vérifié | 63 | tests/primitives.test.ts |
| `KbdCombo` | . | src/index.ts | src/ui/kbd-combo.svelte | vérifié | 6 | tests/primitives.test.ts |
| `KbdGroup` | . | src/index.ts | — | non porté | 0 | — |
| `KbdKeys` | . | src/index.ts | src/ui/kbd-keys.svelte | porté | 6 | — |
| `KbdKeysProps` | . | src/index.ts | — | non porté | 0 | — |
| `KbdProps` | . | src/index.ts | — | non porté | 0 | — |
| `kbdVariants` | ., ./variants | src/index.ts | src/ui/kbd-variants.ts | porté | 0 | — |
| `KeyPlatform` | . | src/index.ts | — | non porté | 0 | — |
| `KiloMark` | . | src/index.ts | ./kilo-mark.svelte | porté | 8 | — |
| `KimiMark` | . | src/index.ts | ./provider-marks/kimi-mark.svelte | porté | 3 | — |
| `KpiCell` | . | src/index.ts | ./kpi-strip.svelte | porté | 8 | — |
| `KpiStrip` | . | src/index.ts | ./kpi-strip.svelte | porté | 8 | — |
| `Label` | . | src/index.ts | ./label.svelte | porté | 17 | — |
| `LabelMark` | . | src/index.ts | ./label-mark.svelte | porté | 8 | — |
| `LabelTone` | . | src/index.ts | — | non porté | 0 | — |
| `lighten` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `LinkComponent` | . | src/index.ts | — | non porté | 0 | — |
| `LinkLocation` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `LinkProps` | . | src/index.ts | — | non porté | 0 | — |
| `LinkProvider` | . | src/index.ts | — | non porté | 0 | — |
| `linkVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `ListDetail` | . | src/index.ts | ./shell/list-detail.svelte | porté | 5 | — |
| `ListPane` | . | src/index.ts | ./shell/list-pane.svelte | porté | 5 | — |
| `LOCAL_CANVAS_TOOL_GROUPS` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 11 | — |
| `Logo` | ., ./blocks | src/index.ts | ./blocks/logo-marquee.svelte | porté | 4 | — |
| `LogoMarquee` | ., ./blocks | src/index.ts | ./blocks/logo-marquee.svelte | porté | 9 | — |
| `MailboxIcon` | . | src/index.ts | ./mailbox-icon.svelte | porté | 3 | — |
| `MailboxIconHandle` | . | src/index.ts | ./mailbox-icon.svelte | porté | 3 | — |
| `markTooltipClosed` | . | src/index.ts | — | non porté | 0 | — |
| `markTooltipOpen` | . | src/index.ts | — | non porté | 0 | — |
| `menuContentVariants` | ., ./variants | src/index.ts | ./menu-variants | porté | 7 | — |
| `MenuGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `MenuHighlight` | ., ./variants | src/index.ts | ./menu-variants | porté | 0 | — |
| `menuItemVariants` | ., ./variants | src/index.ts | ./menu-variants | porté | 7 | — |
| `menuLabelVariants` | ., ./variants | src/index.ts | ./menu-variants | porté | 7 | — |
| `menuShortcutVariants` | ., ./variants | src/index.ts | ./menu-variants | porté | 7 | — |
| `MessageSquareMoreIcon` | . | src/index.ts | ./message-square-more-icon.svelte | porté | 3 | — |
| `MessageSquareMoreIconHandle` | . | src/index.ts | ./message-square-more-icon.svelte | porté | 3 | — |
| `MetaMark` | . | src/index.ts | ./provider-marks/meta-mark.svelte | porté | 3 | — |
| `MeterCard` | . | src/index.ts | ./meter-card.svelte | porté | 7 | — |
| `MistralMark` | . | src/index.ts | ./provider-marks/mistral-mark.svelte | porté | 3 | — |
| `mix` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `ModelBadge` | . | src/index.ts | ./model-badge.svelte | porté | 8 | — |
| `ModelFamily` | . | src/index.ts | ./model-family | porté | 7 | — |
| `ModelMark` | . | src/index.ts | — | non porté | 24 | — |
| `monogramTextClass` | . | src/index.ts | ./agent-icon | porté | 0 | — |
| `NextPage` | . | src/index.ts | ./next-page.svelte | porté | 4 | — |
| `NextPageProps` | . | src/index.ts | — | non porté | 0 | — |
| `normalizeSearchText` | . | src/index.ts | — | non porté | 0 | — |
| `OpenAIMark` | . | src/index.ts | ./openai-mark.svelte | porté | 20 | — |
| `OpenCodeMark` | . | src/index.ts | ./opencode-mark.svelte | porté | 8 | — |
| `OpenRouterMark` | . | src/index.ts | ./provider-marks/open-router-mark.svelte | porté | 3 | — |
| `optionId` | . | src/index.ts | — | non porté | 25 | — |
| `Organisation` | . | src/index.ts | — | non porté | 0 | — |
| `OrgMark` | . | src/index.ts | ./shell/org-mark.svelte | porté | 7 | — |
| `OrgSwitcher` | . | src/index.ts | ./shell/org-switcher.svelte | porté | 21 | — |
| `PACKAGE_SENTINEL_CLASS` | . | src/index.ts | — | non porté | 0 | — |
| `PageHeader` | . | src/index.ts | ./deps/page-header.svelte | porté | 26 | — |
| `PALETTE_KEYS` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `PaletteKey` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `Panel` | . | src/index.ts | ./panel.svelte | porté | 6 | — |
| `PANEL_ENTER` | . | src/index.ts | — | non porté | 0 | — |
| `PANEL_STAGGER` | . | src/index.ts | — | non porté | 0 | — |
| `parseColor` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `pathSegments` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 11 | — |
| `Payload` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `PEER_INK` | . | src/index.ts | — | non porté | 0 | — |
| `PerplexityMark` | . | src/index.ts | ./provider-marks/perplexity-mark.svelte | porté | 3 | — |
| `PersonAvatar` | . | src/index.ts | ./person-avatar.svelte | porté | 19 | — |
| `PersonRef` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `Pill` | . | src/index.ts | ./pill.svelte | porté | 10 | — |
| `PillProps` | . | src/index.ts | — | non porté | 0 | — |
| `PillSize` | . | src/index.ts | ./pill.svelte | porté | 0 | — |
| `PillSurface` | . | src/index.ts | ./pill.svelte | porté | 0 | — |
| `PlanItem` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `platformKey` | . | src/index.ts | — | non porté | 0 | — |
| `platformKeys` | . | src/index.ts | — | non porté | 0 | — |
| `PlusCorners` | ., ./blocks | src/index.ts | ./blocks/plus-corners.svelte | porté | 2 | — |
| `PlusDecorator` | ., ./blocks | src/index.ts | ./blocks/plus-decorator.svelte | porté | 2 | — |
| `PlusMinusGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `Popover` | . | src/index.ts | ./popover.svelte | porté | 7 | — |
| `PopoverClose` | . | src/index.ts | — | non porté | 0 | — |
| `PopoverContent` | . | src/index.ts | ./popover-content.svelte | porté | 7 | — |
| `PopoverDescription` | . | src/index.ts | ./popover-description.svelte | porté | 7 | — |
| `PopoverHeader` | . | src/index.ts | ./popover-header.svelte | porté | 7 | — |
| `PopoverPortal` | . | src/index.ts | — | non porté | 0 | — |
| `PopoverTitle` | . | src/index.ts | ./popover-title.svelte | porté | 7 | — |
| `PopoverTrigger` | . | src/index.ts | ./popover-trigger.svelte | porté | 7 | — |
| `prefersReducedMotion` | . | src/index.ts | — | non porté | 0 | — |
| `PresenceCursor` | . | src/index.ts | ./canvas/presence-cursor.svelte | porté | 6 | — |
| `PresenceLayer` | . | src/index.ts | ./canvas/presence-layer.svelte | porté | 6 | — |
| `PresencePeer` | . | src/index.ts | src/lots/f6-canvas-code/canvas/types.ts | porté | 0 | — |
| `Priority` | . | src/index.ts | ./priority-icon.svelte | porté | 0 | — |
| `PriorityIcon` | . | src/index.ts | ./priority-icon.svelte | porté | 5 | — |
| `ProfileMenu` | . | src/index.ts | ./shell/profile-menu.svelte | porté | 19 | — |
| `Progress` | . | src/index.ts | ./progress.svelte | porté | 8 | — |
| `ProgressIndicator` | . | src/index.ts | ./progress-indicator.svelte | porté | 8 | — |
| `ProgressLabel` | . | src/index.ts | ./progress-label.svelte | porté | 8 | — |
| `ProgressTone` | . | src/index.ts | ./progress-model | porté | 0 | — |
| `ProgressTrack` | . | src/index.ts | ./progress-track.svelte | porté | 8 | — |
| `ProgressValue` | . | src/index.ts | ./progress-value.svelte | porté | 8 | — |
| `PropertiesPane` | . | src/index.ts | ./shell/properties-pane.svelte | porté | 5 | — |
| `PropertyRow` | . | src/index.ts | ./shell/property-row.svelte | porté | 5 | — |
| `QwenMark` | . | src/index.ts | ./provider-marks/qwen-mark.svelte | porté | 3 | — |
| `RadioGroup` | . | src/index.ts | ./radio-group | porté | 5 | — |
| `RadioGroupItem` | . | src/index.ts | ./radio-group | porté | 5 | — |
| `Rail` | . | src/index.ts | ./rail.svelte | porté | 1 | — |
| `RailGlyph` | . | src/index.ts | ./animated-icon | porté | 16 | — |
| `RailGroup` | . | src/index.ts | ./shell/rail-group.svelte | porté | 5 | — |
| `RailLink` | . | src/index.ts | ./shell/rail-link.svelte | porté | 5 | — |
| `RailNode` | . | src/index.ts | ./rail-node.svelte | porté | 1 | — |
| `RailProps` | . | src/index.ts | — | non porté | 0 | — |
| `RatchetOptions` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetRule` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetSuiteConfig` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetSuiteRunner` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetViolation` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `reactionChips` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `readable` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `ReplicateMark` | . | src/index.ts | ./provider-marks/replicate-mark.svelte | porté | 3 | — |
| `resetTooltipTiming` | . | src/index.ts | — | non porté | 7 | — |
| `ResizableHandle` | . | src/index.ts | ./layout/resizable-handle.svelte | porté | 6 | — |
| `ResizableLayout` | . | src/index.ts | ./layout/resizable.svelte | porté | 0 | — |
| `ResizableOrientation` | . | src/index.ts | ./layout/resizable.svelte | porté | 0 | — |
| `ResizablePane` | . | src/index.ts | ./layout/resizable-pane.svelte | porté | 6 | — |
| `ResizableSplit` | . | src/index.ts | ./layout/resizable-split.svelte | porté | 6 | — |
| `resolveBase` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveClassName` | . | src/index.ts | — | non porté | 0 | — |
| `resolveColor` | . | src/index.ts | — | non porté | 0 | — |
| `ResolvedTheme` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveTheme` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveToken` | . | src/index.ts | — | non porté | 0 | — |
| `Rgb` | . | src/index.ts | — | non porté | 0 | — |
| `RgbaColor` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `rgbString` | . | src/index.ts | — | non porté | 0 | — |
| `Role` | . | src/index.ts | — | non porté | 0 | — |
| `RULES` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `runRatchet` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `scanHintTargets` | . | src/index.ts | — | non porté | 0 | — |
| `ScrollArea` | . | src/index.ts | ./scroll-area.svelte | porté | 2 | — |
| `ScrollEdges` | . | src/index.ts | ./scroll-fade | porté | 0 | — |
| `ScrollFade` | . | src/index.ts | ./scroll-fade | porté | 2 | — |
| `ScrollRail` | . | src/index.ts | ./blocks/scroll-rail.svelte | porté | 3 | — |
| `SearchOverlay` | . | src/index.ts | — | non porté | 10 | — |
| `SearchOverlayProps` | . | src/index.ts | — | non porté | 0 | — |
| `SearchResult` | . | src/index.ts | — | non porté | 10 | — |
| `SearchResultRow` | . | src/index.ts | — | non porté | 10 | — |
| `SearchStatus` | . | src/index.ts | — | non porté | 10 | — |
| `SecretInput` | . | src/index.ts | ./secret-input.svelte | porté | 5 | — |
| `SecretInputProps` | . | src/index.ts | ./secret-input.svelte | porté | 0 | — |
| `SectionHeader` | . | src/index.ts | ./section-header.svelte | porté | 11 | — |
| `segmentClassName` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `Segmented` | . | src/index.ts | ./segmented.svelte | porté | 9 | — |
| `SegmentedIconGroup` | . | src/index.ts | ./segmented-icon-group.svelte | porté | 5 | — |
| `SegmentedOption` | . | src/index.ts | ./segmented.svelte | porté | 0 | — |
| `SegmentedProps` | . | src/index.ts | ./segmented.svelte | porté | 8 | — |
| `SegmentMeter` | . | src/index.ts | ./segment-meter.svelte | porté | 7 | — |
| `Select` | . | src/index.ts | ./select.svelte | porté | 13 | — |
| `selectableIds` | . | src/index.ts | — | non porté | 15 | — |
| `SelectOption` | . | src/index.ts | ./select-types | porté | 0 | — |
| `SelectProps` | . | src/index.ts | ./select-types | porté | 13 | — |
| `SendGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `Separator` | . | src/index.ts | ./separator.svelte | porté | 3 | — |
| `Session` | . | src/index.ts | — | non porté | 0 | — |
| `SessionErrorView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `SessionLabel` | . | src/index.ts | — | non porté | 0 | — |
| `SessionMeta` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `SessionPhase` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `SessionPipeline` | ./session | src/session.ts | ./session/session-pipeline.svelte | porté | 4 | — |
| `SessionPipelineProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionPriority` | . | src/index.ts | — | non porté | 0 | — |
| `SessionStatus` | . | src/index.ts | — | non porté | 0 | — |
| `SessionStatusKind` | . | src/index.ts | — | non porté | 0 | — |
| `SessionTimeline` | ./session | src/session.ts | ./session/session-timeline.svelte | porté | 17 | — |
| `SessionTimelineProps` | ./session | src/session.ts | ./session/session-block-props | porté | 0 | — |
| `SessionView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `SettingCard` | . | src/index.ts | ./setting-card.svelte | porté | 10 | — |
| `SettingRow` | . | src/index.ts | ./setting-row.svelte | porté | 10 | — |
| `SettingsNavGroup` | . | src/index.ts | ./shell/settings-nav | porté | 5 | — |
| `SettingsNavItem` | . | src/index.ts | ./shell/settings-nav | porté | 0 | — |
| `SettingsShell` | . | src/index.ts | ./shell/settings-shell.svelte | porté | 5 | — |
| `Sheet` | . | src/index.ts | ./sheet.svelte | porté | 5 | — |
| `SheetClose` | . | src/index.ts | ./sheet-close.svelte | porté | 5 | — |
| `SheetContent` | . | src/index.ts | ./sheet-content.svelte | porté | 5 | — |
| `SheetDescription` | . | src/index.ts | ./sheet-description.svelte | porté | 5 | — |
| `SheetFooter` | . | src/index.ts | ./sheet-footer.svelte | porté | 5 | — |
| `SheetHeader` | . | src/index.ts | ./sheet-header.svelte | porté | 5 | — |
| `SheetTitle` | . | src/index.ts | ./sheet-title.svelte | porté | 5 | — |
| `SheetTrigger` | . | src/index.ts | ./sheet-trigger.svelte | porté | 5 | — |
| `Sidebar` | . | src/index.ts | ./shell/sidebar.svelte | porté | 13 | — |
| `SidebarBody` | . | src/index.ts | ./shell/sidebar-body.svelte | porté | 13 | — |
| `SidebarChild` | . | src/index.ts | ./shell/sidebar | porté | 0 | — |
| `SidebarFooter` | . | src/index.ts | ./shell/sidebar-footer.svelte | porté | 6 | — |
| `SidebarGroup` | . | src/index.ts | ./shell/sidebar-group.svelte | porté | 21 | — |
| `SidebarHeader` | . | src/index.ts | ./shell/sidebar-header.svelte | porté | 13 | — |
| `SidebarItem` | . | src/index.ts | ./shell/sidebar-item.svelte | porté | 21 | — |
| `SidebarPanel` | . | src/index.ts | ./shell/sidebar-panel.svelte | porté | 13 | — |
| `SidebarSearch` | . | src/index.ts | ./shell/sidebar-search.svelte | porté | 6 | — |
| `SideDock` | . | src/index.ts | ./layout/side-dock.svelte | porté | 15 | — |
| `SideDockMode` | . | src/index.ts | ./layout/app-frame | porté | 0 | — |
| `SideDockSizeToggle` | . | src/index.ts | ./layout/side-dock-size-toggle.svelte | porté | 15 | — |
| `Skeleton` | . | src/index.ts | ./skeleton.svelte | porté | 8 | — |
| `SkeletonRadius` | . | src/index.ts | ./skeleton.svelte | porté | 0 | — |
| `slideGeometry` | . | src/index.ts | — | non porté | 0 | — |
| `SlideGeometry` | . | src/index.ts | — | non porté | 0 | — |
| `Slider` | . | src/index.ts | ./slider.svelte | porté | 5 | — |
| `SliderProps` | . | src/index.ts | ./slider.svelte | porté | 5 | — |
| `slideTransition` | . | src/index.ts | — | non porté | 0 | — |
| `SPACES_TOOL_GROUPS` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 11 | — |
| `Spinner` | . | src/index.ts | src/components/ui/spinner.svelte | vérifié | 15 | tests/tab-strip.test.ts |
| `SplitButton` | . | src/index.ts | ./split-button.svelte | porté | 4 | — |
| `SplitButtonProps` | . | src/index.ts | ./split-button.svelte | porté | 0 | — |
| `splitGlyphCombo` | . | src/index.ts | — | non porté | 0 | — |
| `splitHighlights` | . | src/index.ts | — | non porté | 0 | — |
| `splitIncremental` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `splitTopLevelBlocks` | ./session | src/session.ts | ./session/markdown-blocks | porté | 0 | — |
| `SPRING_DOCK` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_INDICATOR` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_PILL` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_RAIL` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `StatCard` | . | src/index.ts | ./stat-card.svelte | porté | 7 | — |
| `StatGrid` | . | src/index.ts | ./stat-grid.svelte | porté | 7 | — |
| `StatusDot` | . | src/index.ts | ./status-dot.svelte | porté | 15 | — |
| `StatusDotCutout` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotProps` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotSize` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotTone` | . | src/index.ts | ./status-dot.svelte | porté | 5 | — |
| `StatusIcon` | . | src/index.ts | ../f4-ui-second-half-patterns/status-icon.svelte | porté | 24 | — |
| `statusIconOf` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view-helpers.ts | porté | 0 | — |
| `stepHighlight` | . | src/index.ts | — | non porté | 0 | — |
| `StepList` | . | src/index.ts | ./step-list.svelte | porté | 5 | — |
| `StepListProps` | . | src/index.ts | — | non porté | 0 | — |
| `StepListStep` | . | src/index.ts | ./step-list.svelte | porté | 0 | — |
| `StepStatus` | . | src/index.ts | ./step-list.svelte | porté | 0 | — |
| `StreamingMarkdown` | ./session | src/session.ts | ./session/streaming-markdown.svelte | porté | 4 | — |
| `StreamingMarkdownProps` | ./session | src/session.ts | ./session/session-block-props | porté | 0 | — |
| `StreamingState` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `strictRules` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `stripAnsi` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view-helpers.ts | porté | 0 | — |
| `Switch` | . | src/index.ts | ./lots/f1-primitives-forms/switch.svelte | porté | 24 | — |
| `SwitchProps` | . | src/index.ts | — | non porté | 7 | — |
| `SYNTAX_TEXT_CLASS` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 3 | — |
| `SyntaxRole` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 3 | — |
| `Table` | . | src/index.ts | ./table/table.svelte | porté | 6 | — |
| `TableBody` | . | src/index.ts | ./table/table-body.svelte | porté | 6 | — |
| `TableCaption` | . | src/index.ts | ./table/table-caption.svelte | porté | 6 | — |
| `TableCell` | . | src/index.ts | ./table/table-cell.svelte | porté | 6 | — |
| `TableFooter` | . | src/index.ts | ./table/table-footer.svelte | porté | 6 | — |
| `TableHead` | . | src/index.ts | ./table/table-head.svelte | porté | 6 | — |
| `TableHeader` | . | src/index.ts | ./table/table-header.svelte | porté | 6 | — |
| `TableRow` | . | src/index.ts | ./table/table-row.svelte | porté | 6 | — |
| `TableSearch` | . | src/index.ts | ./table-search.svelte | porté | 7 | — |
| `Tabs` | . | src/index.ts | ./tabs/tabs.svelte | porté | 7 | — |
| `TabsContent` | . | src/index.ts | ./tabs/tabs-content.svelte | porté | 7 | — |
| `TabsList` | . | src/index.ts | ./tabs/tabs-list.svelte | porté | 7 | — |
| `tabsListVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `TabsTrigger` | . | src/index.ts | ./tabs/tabs-trigger.svelte | porté | 7 | — |
| `TabStrip` | . | src/index.ts | src/components/layout/tab-strip.svelte | vérifié | 10 | tests/tab-strip.test.ts |
| `TabStripItem` | . | src/index.ts | src/components/layout/tab-strip-logic.ts | porté | 0 | — |
| `TabStripTabProps` | . | src/index.ts | — | non porté | 0 | — |
| `Tag` | . | src/index.ts | ./tag.svelte | porté | 8 | — |
| `TerminalBlock` | . | src/index.ts | ./code-surface/terminal-block.svelte | porté | 18 | — |
| `TerminalBlockProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalCommandInput` | . | src/index.ts | ./code-surface/command-input.svelte | porté | 6 | — |
| `TerminalCommandInputProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalLine` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `TerminalLinkKind` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `TerminalOutput` | . | src/index.ts | ./code-surface/terminal-output.svelte | porté | 18 | — |
| `TerminalOutputLine` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalOutputProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalPalette` | . | src/index.ts | ./code-surface/terminal-palette.svelte | porté | 1 | — |
| `TerminalSegment` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `TerminalStatus` | . | src/index.ts | ./code-surface/terminal-status.svelte | porté | 6 | — |
| `TerminalStatusProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalStopControl` | . | src/index.ts | ./code-surface/terminal-stop-control.svelte | porté | 7 | — |
| `TerminalStopControlProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `Textarea` | . | src/index.ts | ./textarea.svelte | porté | 4 | — |
| `TextLink` | . | src/index.ts | ./text-link.svelte | porté | 3 | — |
| `Theme` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `THEME_KEY_DEFINITION_BY_KEY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `THEME_KEY_REGISTRY` | ./theme | src/theme/index.ts | ../../theme/theme-key-registry | porté | 1 | — |
| `ThemeAppearance` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `themeFromToml` | ./theme | src/theme/index.ts | ./parse-theme | porté | 0 | — |
| `themeInitScript` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `ThemeKey` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyDefinition` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyRule` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyStyle` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeKeyValue` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeMode` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeOverride` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `ThemeProvider` | ., ./blocks | src/index.ts | ./deps/theme-provider.svelte | porté | 17 | — |
| `ThemeSetting` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `ThemeToggle` | . | src/index.ts | ./shell/theme-toggle.svelte | porté | 8 | — |
| `ThemeVariant` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeWarning` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `TimelineCalendar` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ./blocks/timeline-calendar.svelte | porté | 8 | — |
| `toast` | . | src/index.ts | ./toast/toast-manager.svelte | porté | 7 | — |
| `Toast` | . | src/index.ts | ./toast/toast.svelte | porté | 7 | — |
| `ToastAction` | . | src/index.ts | ./toast/toast-action.svelte | porté | 7 | — |
| `ToastClose` | . | src/index.ts | ./toast/toast-close.svelte | porté | 7 | — |
| `ToastContent` | . | src/index.ts | ./toast/toast-content.svelte | porté | 7 | — |
| `ToastDescription` | . | src/index.ts | ./toast/toast-description.svelte | porté | 7 | — |
| `Toaster` | . | src/index.ts | ./toast/toaster.svelte | porté | 7 | — |
| `ToastPortal` | . | src/index.ts | ./toast/toast-portal.svelte | porté | 7 | — |
| `ToastProvider` | . | src/index.ts | ./toast/toast-provider.svelte | porté | 7 | — |
| `ToastTitle` | . | src/index.ts | ./toast/toast-title.svelte | porté | 7 | — |
| `ToastViewport` | . | src/index.ts | ./toast/toast-viewport.svelte | porté | 7 | — |
| `TogetherMark` | . | src/index.ts | ./provider-marks/together-mark.svelte | porté | 3 | — |
| `Toggle` | . | src/index.ts | ./toggle.svelte | porté | 7 | — |
| `ToggleGroup` | . | src/index.ts | ./toggle-group | porté | 7 | — |
| `ToggleGroupItem` | . | src/index.ts | ./toggle-group | porté | 7 | — |
| `toggleVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `toHsv` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `TOOL_KIND_ICON` | ./session | src/session.ts | ./session/tool-call-card.svelte | porté | 0 | — |
| `ToolCallCard` | ./session | src/session.ts | ./session/tool-call-card.svelte | porté | 16 | — |
| `ToolCallCardLabels` | ./session | src/session.ts | ./session/tool-call-labels | porté | 0 | — |
| `ToolCallCardProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolCallView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `ToolKind` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `toolKindOf` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view-helpers.ts | porté | 0 | — |
| `ToolStatus` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `Tooltip` | . | src/index.ts | ./tooltip.svelte | porté | 7 | — |
| `TOOLTIP_EASE` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_FADE_IN_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_FADE_OUT_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_OPEN_DELAY` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_SLIDE_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_WARM_WINDOW` | . | src/index.ts | — | non porté | 0 | — |
| `TooltipContent` | . | src/index.ts | ./tooltip-content.svelte | porté | 7 | — |
| `TooltipProvider` | . | src/index.ts | ./tooltip-provider.svelte | porté | 7 | — |
| `TooltipTrigger` | . | src/index.ts | ./tooltip-trigger.svelte | porté | 7 | — |
| `TraceAuthor` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 19 | — |
| `TraceAvatar` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/trace-avatar.svelte | porté | 19 | — |
| `TraceCheckpoint` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceDensity` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace.svelte | porté | 0 | — |
| `TraceGroupBy` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceLabels` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace.svelte | porté | 0 | — |
| `TraceRange` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceSession` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 19 | — |
| `TraceZoom` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ./blocks/checkpoint-trace-model | porté | 19 | — |
| `transcriptRows` | . | src/index.ts | ./comms/comms-view-helpers | porté | 21 | — |
| `TRANSITION_ALL_RULE` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `TrashGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `TurnRow` | ./session | src/session.ts | ./session/turn-row.svelte | porté | 23 | — |
| `TurnRowProps` | ./session | src/session.ts | ./session/session-block-props | porté | 0 | — |
| `TurnView` | ./session | src/session.ts | src/lots/f7-session-comms/session/session-view.ts | porté | 0 | — |
| `UI_SCALE_DEFAULT` | . | src/index.ts | — | non porté | 0 | — |
| `UI_SCALE_MAX` | . | src/index.ts | ./shell/ui-scale | porté | 6 | — |
| `UI_SCALE_MIN` | . | src/index.ts | ./shell/ui-scale | porté | 6 | — |
| `UI_SCALE_PRESETS` | . | src/index.ts | — | non porté | 0 | — |
| `UI_SCALE_STEP` | . | src/index.ts | — | non porté | 0 | — |
| `UiScaleControl` | . | src/index.ts | ./shell/ui-scale-control.svelte | porté | 14 | — |
| `UiScalePanel` | . | src/index.ts | ./shell/ui-scale-panel.svelte | porté | 6 | — |
| `UiScaleShortcuts` | . | src/index.ts | ./shell/ui-scale | porté | 0 | — |
| `UnderlineTabOption` | . | src/index.ts | ./underline-tabs.svelte | porté | 5 | — |
| `UnderlineTabs` | . | src/index.ts | ./underline-tabs.svelte | porté | 5 | — |
| `unreadBadge` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `UploadIcon` | . | src/index.ts | ./upload-icon.svelte | porté | 4 | — |
| `UploadIconHandle` | . | src/index.ts | ./upload-icon.svelte | porté | 3 | — |
| `useComboboxAnchor` | . | src/index.ts | ./combobox-store.svelte | porté | 12 | — |
| `useCommandMenu` | . | src/index.ts | ./use-command-menu.svelte | porté | 6 | — |
| `useLinks` | . | src/index.ts | — | non porté | 0 | — |
| `useListHighlight` | . | src/index.ts | — | non porté | 15 | — |
| `useMeasure` | . | src/index.ts | — | non porté | 0 | — |
| `useScrollEdges` | . | src/index.ts | ./scroll-fade | porté | 2 | — |
| `useSidebar` | . | src/index.ts | ./shell/sidebar | porté | 6 | — |
| `useSideDock` | . | src/index.ts | ./layout/app-frame | porté | 15 | — |
| `useSideDockRoom` | . | src/index.ts | ./layout/app-frame | porté | 15 | — |
| `useTheme` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `useToastManager` | . | src/index.ts | ./toast/toast-manager.svelte | porté | 7 | — |
| `useWindow` | ./session | src/session.ts | ./session/use-window.svelte | porté | 0 | — |
| `VoyageMark` | . | src/index.ts | ./provider-marks/voyage-mark.svelte | porté | 3 | — |
| `withAlpha` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `XAIMark` | . | src/index.ts | ./provider-marks/xai-mark.svelte | porté | 3 | — |
| `XMark` | . | src/index.ts | ./x-mark.svelte | porté | 8 | — |
| `ZedMark` | . | src/index.ts | ./zed-mark.svelte | porté | 8 | — |
| `ZhipuMark` | . | src/index.ts | ./provider-marks/zhipu-mark.svelte | porté | 3 | — |

## Stories

| id | Titre | Fichier | Svelte | Statut | Preuves | Propriétaire |
|---|---|---|---|---|---|---|
| `foundations-principles--page` | Foundations/Principles / Page | stories/foundations/principles.stories.tsx | gallery ?story=foundations-principles--page | porté | — | lot témoin |
| `foundations-colour--page` | Foundations/Colour / Page | stories/foundations/colour.stories.tsx | gallery ?story=foundations-colour--page | porté | — | lot témoin |
| `foundations-type--page` | Foundations/Type / Page | stories/foundations/type.stories.tsx | gallery ?story=foundations-type--page | porté | — | lot témoin |
| `foundations-control-heights--page` | Foundations/Control heights / Page | stories/foundations/control-heights.stories.tsx | gallery ?story=foundations-control-heights--page | porté | — | lot témoin |
| `foundations-spacing--page` | Foundations/Spacing / Page | stories/foundations/spacing.stories.tsx | gallery ?story=foundations-spacing--page | porté | — | lot témoin |
| `foundations-radius--page` | Foundations/Radius / Page | stories/foundations/radius.stories.tsx | gallery ?story=foundations-radius--page | porté | — | lot témoin |
| `foundations-elevation--page` | Foundations/Elevation / Page | stories/foundations/elevation.stories.tsx | gallery ?story=foundations-elevation--page | porté | — | lot témoin |
| `foundations-z-index--page` | Foundations/Z-index / Page | stories/foundations/z-index.stories.tsx | gallery ?story=foundations-z-index--page | porté | — | lot témoin |
| `foundations-motion--page` | Foundations/Motion / Page | stories/foundations/motion.stories.tsx | gallery ?story=foundations-motion--page | porté | — | lot témoin |
| `foundations-icons--page` | Foundations/Icons / Page | stories/foundations/icons.stories.tsx | gallery ?story=foundations-icons--page | porté | — | lot témoin |
| `primitives-animatedicon--off` | Primitives/AnimatedIcon / Off | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--off | porté | — | lot témoin |
| `primitives-animatedicon--on` | Primitives/AnimatedIcon / On | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--on | porté | — | lot témoin |
| `primitives-animatedicon--one-shots` | Primitives/AnimatedIcon / One Shots | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--one-shots | porté | — | lot témoin |
| `primitives-badge--default` | Primitives/Badge / Default | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--default | porté | — | lot témoin |
| `primitives-badge--variants` | Primitives/Badge / Variants | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--variants | porté | — | lot témoin |
| `primitives-badge--sizes` | Primitives/Badge / Sizes | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--sizes | porté | — | lot témoin |
| `primitives-badge--with-icon` | Primitives/Badge / With Icon | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--with-icon | porté | — | lot témoin |
| `primitives-badge--long-text` | Primitives/Badge / Long Text | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--long-text | porté | — | lot témoin |
| `primitives-badge--empty` | Primitives/Badge / Empty | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--empty | porté | — | lot témoin |
| `primitives-button--default` | Primitives/Button / Default | stories/ui/button.stories.tsx | gallery ?story=primitives-button--default | porté | 3/3 identiques, max 0.000 % | lot témoin |
| `primitives-button--variants` | Primitives/Button / Variants | stories/ui/button.stories.tsx | gallery ?story=primitives-button--variants | porté | — | lot témoin |
| `primitives-button--sizes` | Primitives/Button / Sizes | stories/ui/button.stories.tsx | gallery ?story=primitives-button--sizes | porté | — | lot témoin |
| `primitives-button--secondary` | Primitives/Button / Secondary | stories/ui/button.stories.tsx | gallery ?story=primitives-button--secondary | porté | — | lot témoin |
| `primitives-button--outline` | Primitives/Button / Outline | stories/ui/button.stories.tsx | gallery ?story=primitives-button--outline | porté | — | lot témoin |
| `primitives-button--ghost` | Primitives/Button / Ghost | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost | porté | — | lot témoin |
| `primitives-button--destructive` | Primitives/Button / Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--destructive | porté | — | lot témoin |
| `primitives-button--ghost-destructive` | Primitives/Button / Ghost Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost-destructive | porté | — | lot témoin |
| `primitives-button--disabled` | Primitives/Button / Disabled | stories/ui/button.stories.tsx | gallery ?story=primitives-button--disabled | porté | — | lot témoin |
| `primitives-button--loading` | Primitives/Button / Loading | stories/ui/button.stories.tsx | gallery ?story=primitives-button--loading | porté | — | lot témoin |
| `primitives-button--with-icon` | Primitives/Button / With Icon | stories/ui/button.stories.tsx | gallery ?story=primitives-button--with-icon | porté | — | lot témoin |
| `primitives-button--pressed` | Primitives/Button / Pressed | stories/ui/button.stories.tsx | gallery ?story=primitives-button--pressed | porté | — | lot témoin |
| `primitives-button--long-text` | Primitives/Button / Long Text | stories/ui/button.stories.tsx | gallery ?story=primitives-button--long-text | porté | — | lot témoin |
| `primitives-colorpicker--default` | Primitives/ColorPicker / Default | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--default | porté | — | lot témoin |
| `primitives-colorpicker--red` | Primitives/ColorPicker / Red | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--red | porté | — | lot témoin |
| `primitives-colorpicker--black` | Primitives/ColorPicker / Black | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--black | porté | — | lot témoin |
| `primitives-colorpicker--hue-slider-alone` | Primitives/ColorPicker / Hue Slider Alone | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--hue-slider-alone | porté | — | lot témoin |
| `primitives-command--default` | Primitives/Command / Default | stories/ui/command.stories.tsx | gallery ?story=primitives-command--default | porté | — | lot témoin |
| `primitives-command--open` | Primitives/Command / Open | stories/ui/command.stories.tsx | gallery ?story=primitives-command--open | porté | — | lot témoin |
| `primitives-command--empty` | Primitives/Command / Empty | stories/ui/command.stories.tsx | gallery ?story=primitives-command--empty | porté | — | lot témoin |
| `primitives-command--disabled-row` | Primitives/Command / Disabled Row | stories/ui/command.stories.tsx | gallery ?story=primitives-command--disabled-row | porté | — | lot témoin |
| `primitives-command--compact` | Primitives/Command / Compact | stories/ui/command.stories.tsx | gallery ?story=primitives-command--compact | porté | — | lot témoin |
| `primitives-command--compact-without-roles` | Primitives/Command / Compact Without Roles | stories/ui/command.stories.tsx | gallery ?story=primitives-command--compact-without-roles | porté | — | lot témoin |
| `primitives-contextmenu--default` | Primitives/ContextMenu / Default | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--default | porté | — | lot témoin |
| `primitives-contextmenu--open` | Primitives/ContextMenu / Open | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--open | porté | — | lot témoin |
| `primitives-contextmenu--disabled-item` | Primitives/ContextMenu / Disabled Item | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--disabled-item | porté | — | lot témoin |
| `primitives-contextmenu--exit` | Primitives/ContextMenu / Exit | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--exit | porté | — | lot témoin |
| `primitives-dialog--default` | Primitives/Dialog / Default | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--default | porté | — | lot témoin |
| `primitives-dialog--open` | Primitives/Dialog / Open | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--open | porté | 1/1 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--destructive` | Primitives/Dialog / Destructive | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--destructive | porté | — | lot témoin |
| `primitives-dialog--without-close-button` | Primitives/Dialog / Without Close Button | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--without-close-button | porté | — | lot témoin |
| `primitives-dialog--long-text` | Primitives/Dialog / Long Text | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--long-text | porté | — | lot témoin |
| `primitives-dialog--media` | Primitives/Dialog / Media | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--media | porté | — | lot témoin |
| `primitives-dialog--large-blurred` | Primitives/Dialog / Large Blurred | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--large-blurred | porté | — | lot témoin |
| `primitives-dropdownmenu--default` | Primitives/DropdownMenu / Default | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--default | porté | — | lot témoin |
| `primitives-dropdownmenu--open` | Primitives/DropdownMenu / Open | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--open | porté | — | lot témoin |
| `primitives-dropdownmenu--icon-rows-align` | Primitives/DropdownMenu / Icon Rows Align | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--icon-rows-align | porté | — | lot témoin |
| `primitives-dropdownmenu--disabled-item` | Primitives/DropdownMenu / Disabled Item | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--disabled-item | porté | — | lot témoin |
| `primitives-dropdownmenu--long-text` | Primitives/DropdownMenu / Long Text | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--long-text | porté | — | lot témoin |
| `primitives-dropdownmenu--exit` | Primitives/DropdownMenu / Exit | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--exit | porté | — | lot témoin |
| `primitives-dropdownmenu--recipes` | Primitives/DropdownMenu / Recipes | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--recipes | porté | — | lot témoin |
| `primitives-hintgroup--default` | Primitives/HintGroup / Default | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--default | porté | — | lot témoin |
| `primitives-hintgroup--opens-upward` | Primitives/HintGroup / Opens Upward | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--opens-upward | porté | — | lot témoin |
| `primitives-hintgroup--with-disabled` | Primitives/HintGroup / With Disabled | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--with-disabled | porté | — | lot témoin |
| `primitives-iconbutton--default` | Primitives/IconButton / Default | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--default | porté | — | lot témoin |
| `primitives-iconbutton--variants` | Primitives/IconButton / Variants | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--variants | porté | — | lot témoin |
| `primitives-iconbutton--sizes` | Primitives/IconButton / Sizes | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--sizes | porté | — | lot témoin |
| `primitives-iconbutton--ghost-destructive` | Primitives/IconButton / Ghost Destructive | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--ghost-destructive | porté | — | lot témoin |
| `primitives-iconbutton--active` | Primitives/IconButton / Active | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--active | porté | — | lot témoin |
| `primitives-iconbutton--pressed` | Primitives/IconButton / Pressed | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--pressed | porté | — | lot témoin |
| `primitives-iconbutton--round-stepper` | Primitives/IconButton / Round Stepper | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--round-stepper | porté | — | lot témoin |
| `primitives-iconbutton--disabled` | Primitives/IconButton / Disabled | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--disabled | porté | — | lot témoin |
| `primitives-iconbutton--with-hint` | Primitives/IconButton / With Hint | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--with-hint | porté | — | lot témoin |
| `primitives-iconbutton--element-icon` | Primitives/IconButton / Element Icon | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--element-icon | porté | — | lot témoin |
| `primitives-iconbutton--tile-remove` | Primitives/IconButton / Tile Remove | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--tile-remove | porté | — | lot témoin |
| `primitives-iconbutton--floating` | Primitives/IconButton / Floating | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--floating | porté | — | lot témoin |
| `primitives-iconbutton--loading` | Primitives/IconButton / Loading | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--loading | porté | — | lot témoin |
| `primitives-icon--default` | Primitives/Icon / Default | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--default | porté | — | lot témoin |
| `primitives-icon--sizes` | Primitives/Icon / Sizes | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--sizes | porté | — | lot témoin |
| `primitives-icon--muted` | Primitives/Icon / Muted | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--muted | porté | — | lot témoin |
| `primitives-icon--beside-text` | Primitives/Icon / Beside Text | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--beside-text | porté | — | lot témoin |
| `primitives-input--default` | Primitives/Input / Default | stories/ui/input.stories.tsx | gallery ?story=primitives-input--default | porté | — | lot témoin |
| `primitives-input--filled` | Primitives/Input / Filled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--filled | porté | — | lot témoin |
| `primitives-input--sizes` | Primitives/Input / Sizes | stories/ui/input.stories.tsx | gallery ?story=primitives-input--sizes | porté | — | lot témoin |
| `primitives-input--disabled` | Primitives/Input / Disabled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--disabled | porté | — | lot témoin |
| `primitives-input--invalid` | Primitives/Input / Invalid | stories/ui/input.stories.tsx | gallery ?story=primitives-input--invalid | porté | — | lot témoin |
| `primitives-input--long-text` | Primitives/Input / Long Text | stories/ui/input.stories.tsx | gallery ?story=primitives-input--long-text | porté | — | lot témoin |
| `primitives-input--with-icon` | Primitives/Input / With Icon | stories/ui/input.stories.tsx | gallery ?story=primitives-input--with-icon | porté | — | lot témoin |
| `primitives-kbd--default` | Primitives/Kbd / Default | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--default | porté | — | lot témoin |
| `primitives-kbd--sizes` | Primitives/Kbd / Sizes | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--sizes | porté | — | lot témoin |
| `primitives-kbd--combo` | Primitives/Kbd / Combo | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--combo | porté | — | lot témoin |
| `primitives-kbd--variants` | Primitives/Kbd / Variants | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--variants | porté | — | lot témoin |
| `primitives-kbd--platforms` | Primitives/Kbd / Platforms | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--platforms | porté | — | lot témoin |
| `primitives-kbd--long-text` | Primitives/Kbd / Long Text | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--long-text | porté | — | lot témoin |
| `primitives-popover--default` | Primitives/Popover / Default | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--default | porté | — | lot témoin |
| `primitives-popover--open` | Primitives/Popover / Open | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--open | porté | — | lot témoin |
| `primitives-popover--with-arrow` | Primitives/Popover / With Arrow | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--with-arrow | porté | — | lot témoin |
| `primitives-popover--tinted` | Primitives/Popover / Tinted | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--tinted | porté | — | lot témoin |
| `primitives-popover--glass` | Primitives/Popover / Glass | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--glass | porté | — | lot témoin |
| `primitives-popover--long-text` | Primitives/Popover / Long Text | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--long-text | porté | — | lot témoin |
| `primitives-popover--exit` | Primitives/Popover / Exit | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--exit | porté | — | lot témoin |
| `primitives-scrollarea--default` | Primitives/ScrollArea / Default | stories/ui/scroll-area.stories.tsx | gallery ?story=primitives-scrollarea--default | porté | — | lot témoin |
| `primitives-scrollarea--empty` | Primitives/ScrollArea / Empty | stories/ui/scroll-area.stories.tsx | gallery ?story=primitives-scrollarea--empty | porté | — | lot témoin |
| `primitives-scrollfade--default` | Primitives/ScrollFade / Default | stories/ui/scroll-fade.stories.tsx | gallery ?story=primitives-scrollfade--default | porté | — | lot témoin |
| `primitives-scrollfade--short-list` | Primitives/ScrollFade / Short List | stories/ui/scroll-fade.stories.tsx | gallery ?story=primitives-scrollfade--short-list | porté | — | lot témoin |
| `primitives-secretinput--empty` | Primitives/SecretInput / Empty | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--empty | porté | — | lot témoin |
| `primitives-secretinput--configured` | Primitives/SecretInput / Configured | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--configured | porté | — | lot témoin |
| `primitives-secretinput--custom-placeholder` | Primitives/SecretInput / Custom Placeholder | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--custom-placeholder | porté | — | lot témoin |
| `primitives-secretinput--disabled` | Primitives/SecretInput / Disabled | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--disabled | porté | — | lot témoin |
| `primitives-secretinput--invalid` | Primitives/SecretInput / Invalid | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--invalid | porté | — | lot témoin |
| `primitives-segmented--default` | Primitives/Segmented / Default | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--default | porté | — | lot témoin |
| `primitives-segmented--small` | Primitives/Segmented / Small | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--small | porté | — | lot témoin |
| `primitives-segmented--disabled` | Primitives/Segmented / Disabled | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--disabled | porté | — | lot témoin |
| `primitives-segmented--no-selection` | Primitives/Segmented / No Selection | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--no-selection | porté | — | lot témoin |
| `primitives-segmented--with-icon` | Primitives/Segmented / With Icon | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--with-icon | porté | — | lot témoin |
| `primitives-segmented--icon-only` | Primitives/Segmented / Icon Only | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--icon-only | porté | — | lot témoin |
| `primitives-segmented--node-labels` | Primitives/Segmented / Node Labels | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--node-labels | porté | — | lot témoin |
| `primitives-segmented--long-text` | Primitives/Segmented / Long Text | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--long-text | porté | — | lot témoin |
| `primitives-select--default` | Primitives/Select / Default | stories/ui/select.stories.tsx | gallery ?story=primitives-select--default | porté | — | lot témoin |
| `primitives-select--open` | Primitives/Select / Open | stories/ui/select.stories.tsx | gallery ?story=primitives-select--open | porté | — | lot témoin |
| `primitives-select--exit` | Primitives/Select / Exit | stories/ui/select.stories.tsx | gallery ?story=primitives-select--exit | porté | — | lot témoin |
| `primitives-select--ghost` | Primitives/Select / Ghost | stories/ui/select.stories.tsx | gallery ?story=primitives-select--ghost | porté | — | lot témoin |
| `primitives-select--pill` | Primitives/Select / Pill | stories/ui/select.stories.tsx | gallery ?story=primitives-select--pill | porté | — | lot témoin |
| `primitives-select--small` | Primitives/Select / Small | stories/ui/select.stories.tsx | gallery ?story=primitives-select--small | porté | — | lot témoin |
| `primitives-select--disabled` | Primitives/Select / Disabled | stories/ui/select.stories.tsx | gallery ?story=primitives-select--disabled | porté | — | lot témoin |
| `primitives-select--placeholder` | Primitives/Select / Placeholder | stories/ui/select.stories.tsx | gallery ?story=primitives-select--placeholder | porté | — | lot témoin |
| `primitives-select--with-label` | Primitives/Select / With Label | stories/ui/select.stories.tsx | gallery ?story=primitives-select--with-label | porté | — | lot témoin |
| `primitives-select--empty` | Primitives/Select / Empty | stories/ui/select.stories.tsx | gallery ?story=primitives-select--empty | porté | — | lot témoin |
| `primitives-select--with-icon` | Primitives/Select / With Icon | stories/ui/select.stories.tsx | gallery ?story=primitives-select--with-icon | porté | — | lot témoin |
| `primitives-select--no-indicator` | Primitives/Select / No Indicator | stories/ui/select.stories.tsx | gallery ?story=primitives-select--no-indicator | porté | — | lot témoin |
| `primitives-select--long-text` | Primitives/Select / Long Text | stories/ui/select.stories.tsx | gallery ?story=primitives-select--long-text | porté | — | lot témoin |
| `primitives-slider--default` | Primitives/Slider / Default | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--default | porté | — | lot témoin |
| `primitives-slider--minimum` | Primitives/Slider / Minimum | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--minimum | porté | — | lot témoin |
| `primitives-slider--maximum` | Primitives/Slider / Maximum | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--maximum | porté | — | lot témoin |
| `primitives-slider--stepped` | Primitives/Slider / Stepped | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--stepped | porté | — | lot témoin |
| `primitives-slider--disabled` | Primitives/Slider / Disabled | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--disabled | porté | — | lot témoin |
| `primitives-splitbutton--default` | Primitives/SplitButton / Default | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--default | porté | — | lot témoin |
| `primitives-splitbutton--busy` | Primitives/SplitButton / Busy | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--busy | porté | — | lot témoin |
| `primitives-splitbutton--disabled` | Primitives/SplitButton / Disabled | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--disabled | porté | — | lot témoin |
| `primitives-splitbutton--open` | Primitives/SplitButton / Open | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--open | porté | — | lot témoin |
| `primitives-switch--off` | Primitives/Switch / Off | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--off | porté | — | lot témoin |
| `primitives-switch--on` | Primitives/Switch / On | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--on | porté | — | lot témoin |
| `primitives-switch--mixed` | Primitives/Switch / Mixed | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--mixed | porté | — | lot témoin |
| `primitives-switch--small` | Primitives/Switch / Small | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--small | porté | — | lot témoin |
| `primitives-switch--disabled` | Primitives/Switch / Disabled | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--disabled | porté | — | lot témoin |
| `primitives-switch--check-appearance` | Primitives/Switch / Check Appearance | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--check-appearance | porté | — | lot témoin |
| `primitives-switch--in-a-settings-row` | Primitives/Switch / In A Settings Row | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--in-a-settings-row | porté | — | lot témoin |
| `primitives-tooltip--default` | Primitives/Tooltip / Default | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--default | porté | — | lot témoin |
| `primitives-tooltip--open` | Primitives/Tooltip / Open | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--open | porté | — | lot témoin |
| `primitives-tooltip--open-below` | Primitives/Tooltip / Open Below | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--open-below | porté | — | lot témoin |
| `primitives-tooltip--long-text` | Primitives/Tooltip / Long Text | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--long-text | porté | — | lot témoin |
| `primitives-tooltip--hint-row` | Primitives/Tooltip / Hint Row | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--hint-row | porté | — | lot témoin |
| `primitives-tooltip--hint-keycaps` | Primitives/Tooltip / Hint Keycaps | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--hint-keycaps | porté | — | lot témoin |
| `primitives-tooltip--exit` | Primitives/Tooltip / Exit | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--exit | porté | — | lot témoin |
| `components-ditherfield--default` | Components/DitherField / Default | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--default | porté | — | lot témoin |
| `components-ditherfield--dots` | Components/DitherField / Dots | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--dots | porté | — | lot témoin |
| `components-ditherfield--recoloured` | Components/DitherField / Recoloured | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--recoloured | porté | — | lot témoin |
| `components-ditherfield--inside-theme-provider` | Components/DitherField / Inside Theme Provider | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--inside-theme-provider | porté | — | lot témoin |
| `components-ditherfield--with-copy` | Components/DitherField / With Copy | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--with-copy | porté | — | lot témoin |
| `components-ditherfield--no-canvas` | Components/DitherField / No Canvas | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--no-canvas | porté | — | lot témoin |
| `components-logomarquee--default` | Components/LogoMarquee / Default | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--default | porté | — | lot témoin |
| `components-logomarquee--marks` | Components/LogoMarquee / Marks | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--marks | porté | — | lot témoin |
| `components-logomarquee--no-label` | Components/LogoMarquee / No Label | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--no-label | porté | — | lot témoin |
| `components-logomarquee--many-items` | Components/LogoMarquee / Many Items | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--many-items | porté | — | lot témoin |
| `components-accordion--default` | Components/Accordion / Default | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-accordion--open` | Components/Accordion / Open | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--open | porté | — | lot témoin |
| `components-accordion--multiple` | Components/Accordion / Multiple | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--multiple | porté | — | lot témoin |
| `components-accordion--disabled` | Components/Accordion / Disabled | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--disabled | porté | — | lot témoin |
| `components-accordion--long-text` | Components/Accordion / Long Text | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--long-text | porté | — | lot témoin |
| `components-accordion--many-items` | Components/Accordion / Many Items | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--many-items | porté | — | lot témoin |
| `components-agenticon--external-monochrome` | Components/AgentIcon / External Monochrome | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--external-monochrome | porté | — | lot témoin |
| `components-agenticon--external-colour` | Components/AgentIcon / External Colour | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--external-colour | porté | — | lot témoin |
| `components-agenticon--monogram` | Components/AgentIcon / Monogram | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--monogram | porté | — | lot témoin |
| `components-alertdialog--default` | Components/AlertDialog / Default | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--default | porté | — | lot témoin |
| `components-alertdialog--open` | Components/AlertDialog / Open | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--open | porté | — | lot témoin |
| `components-alertdialog--not-destructive` | Components/AlertDialog / Not Destructive | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--not-destructive | porté | — | lot témoin |
| `components-alertdialog--long-text` | Components/AlertDialog / Long Text | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--long-text | porté | — | lot témoin |
| `components-alertdialog--parts` | Components/AlertDialog / Parts | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--parts | porté | — | lot témoin |
| `components-alertdialog--blurred-dismissible` | Components/AlertDialog / Blurred Dismissible | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--blurred-dismissible | porté | — | lot témoin |
| `components-atlasmark--default` | Components/AtlasMark / Default | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-atlasmark--sizes` | Components/AtlasMark / Sizes | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--sizes | porté | — | lot témoin |
| `components-atlasmark--inks` | Components/AtlasMark / Inks | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--inks | porté | — | lot témoin |
| `components-atlasmark--badge` | Components/AtlasMark / Badge | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--badge | porté | — | lot témoin |
| `components-atlasmark--wordmark` | Components/AtlasMark / Wordmark | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--wordmark | porté | — | lot témoin |
| `components-atlasmark--badge-tones` | Components/AtlasMark / Badge Tones | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--badge-tones | porté | — | lot témoin |
| `components-atlasmark--lockups` | Components/AtlasMark / Lockups | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--lockups | porté | — | lot témoin |
| `components-avatarstack--default` | Components/AvatarStack / Default | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--default | porté | — | lot témoin |
| `components-avatarstack--empty` | Components/AvatarStack / Empty | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--empty | porté | — | lot témoin |
| `components-avatarstack--single` | Components/AvatarStack / Single | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--single | porté | — | lot témoin |
| `components-avatarstack--large` | Components/AvatarStack / Large | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--large | porté | — | lot témoin |
| `components-avatarstack--many-items` | Components/AvatarStack / Many Items | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--many-items | porté | — | lot témoin |
| `components-avatar--default` | Components/Avatar / Default | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--default | porté | — | lot témoin |
| `components-avatar--with-image` | Components/Avatar / With Image | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--with-image | porté | — | lot témoin |
| `components-avatar--error-state` | Components/Avatar / Error | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--error-state | porté | — | lot témoin |
| `components-avatar--sizes` | Components/Avatar / Sizes | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--sizes | porté | — | lot témoin |
| `components-avatar--group` | Components/Avatar / Group | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--group | porté | — | lot témoin |
| `components-avatar--many-items` | Components/Avatar / Many Items | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--many-items | porté | — | lot témoin |
| `components-brandmarks--social` | Components/BrandMarks / Social | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--social | porté | — | lot témoin |
| `components-brandmarks--agents` | Components/BrandMarks / Agents | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--agents | porté | — | lot témoin |
| `components-brandmarks--models` | Components/BrandMarks / Models | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--models | porté | — | lot témoin |
| `components-brandmarks--editors` | Components/BrandMarks / Editors | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--editors | porté | — | lot témoin |
| `components-brandmarks--sizes` | Components/BrandMarks / Sizes | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--sizes | porté | — | lot témoin |
| `components-brandmarks--on-card` | Components/BrandMarks / On Card | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--on-card | porté | — | lot témoin |
| `components-brandmarks--titled-model-marks` | Components/BrandMarks / Titled Model Marks | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--titled-model-marks | porté | — | lot témoin |
| `components-brandmarks--in-buttons` | Components/BrandMarks / In Buttons | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--in-buttons | porté | — | lot témoin |
| `components-breadcrumb--default` | Components/Breadcrumb / Default | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--default | porté | — | lot témoin |
| `components-breadcrumb--single` | Components/Breadcrumb / Single | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--single | porté | — | lot témoin |
| `components-breadcrumb--collapsed` | Components/Breadcrumb / Collapsed | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--collapsed | porté | — | lot témoin |
| `components-breadcrumb--many-items` | Components/Breadcrumb / Many Items | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--many-items | porté | — | lot témoin |
| `components-breadcrumb--long-text` | Components/Breadcrumb / Long Text | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--long-text | porté | — | lot témoin |
| `components-callout--default` | Components/Callout / Default | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--default | porté | — | lot témoin |
| `components-callout--tones` | Components/Callout / Tones | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tones | porté | — | lot témoin |
| `components-callout--error-state` | Components/Callout / Error | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--error-state | porté | — | lot témoin |
| `components-callout--with-action` | Components/Callout / With Action | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--with-action | porté | — | lot témoin |
| `components-callout--custom-icon` | Components/Callout / Custom Icon | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--custom-icon | porté | — | lot témoin |
| `components-callout--no-icon` | Components/Callout / No Icon | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--no-icon | porté | — | lot témoin |
| `components-callout--long-text` | Components/Callout / Long Text | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--long-text | porté | — | lot témoin |
| `components-callout--recipe` | Components/Callout / Recipe | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--recipe | porté | — | lot témoin |
| `components-callout--tucked` | Components/Callout / Tucked | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tucked | porté | — | lot témoin |
| `components-callout--tucked-tones` | Components/Callout / Tucked Tones | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tucked-tones | porté | — | lot témoin |
| `components-callout--animated` | Components/Callout / Animated | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--animated | porté | — | lot témoin |
| `components-checkbox--default` | Components/Checkbox / Default | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--default | porté | — | lot témoin |
| `components-checkbox--checked` | Components/Checkbox / Checked | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--checked | porté | — | lot témoin |
| `components-checkbox--indeterminate` | Components/Checkbox / Indeterminate | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--indeterminate | porté | — | lot témoin |
| `components-checkbox--disabled` | Components/Checkbox / Disabled | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--disabled | porté | — | lot témoin |
| `components-checkbox--error-state` | Components/Checkbox / Error | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--error-state | porté | — | lot témoin |
| `components-checkbox--long-text` | Components/Checkbox / Long Text | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--long-text | porté | — | lot témoin |
| `components-checkbox--many-items` | Components/Checkbox / Many Items | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--many-items | porté | — | lot témoin |
| `components-code--default` | Components/Code / Default | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--default | porté | — | lot témoin |
| `components-code--in-sentence` | Components/Code / In Sentence | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--in-sentence | porté | — | lot témoin |
| `components-code--block` | Components/Code / Block | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--block | porté | — | lot témoin |
| `components-code--long-text` | Components/Code / Long Text | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--long-text | porté | — | lot témoin |
| `components-code--diff` | Components/Code / Diff | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--diff | porté | — | lot témoin |
| `components-code--diff-options` | Components/Code / Diff Options | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--diff-options | porté | — | lot témoin |
| `components-code--fence` | Components/Code / Fence | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--fence | porté | — | lot témoin |
| `components-collapsible--default` | Components/Collapsible / Default | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--default | porté | — | lot témoin |
| `components-collapsible--open` | Components/Collapsible / Open | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--open | porté | — | lot témoin |
| `components-collapsible--disabled` | Components/Collapsible / Disabled | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--disabled | porté | — | lot témoin |
| `components-collapsible--many-items` | Components/Collapsible / Many Items | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--many-items | porté | — | lot témoin |
| `components-combobox--default` | Components/Combobox / Default | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--default | porté | — | lot témoin |
| `components-combobox--open` | Components/Combobox / Open | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--open | porté | — | lot témoin |
| `components-combobox--with-clear` | Components/Combobox / With Clear | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--with-clear | porté | — | lot témoin |
| `components-combobox--disabled` | Components/Combobox / Disabled | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--disabled | porté | — | lot témoin |
| `components-combobox--empty` | Components/Combobox / Empty | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--empty | porté | — | lot témoin |
| `components-combobox--many-items` | Components/Combobox / Many Items | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--many-items | porté | — | lot témoin |
| `components-combobox--long-text` | Components/Combobox / Long Text | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--long-text | porté | — | lot témoin |
| `components-combobox--grouped` | Components/Combobox / Grouped | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--grouped | porté | — | lot témoin |
| `components-combobox--button-trigger` | Components/Combobox / Button Trigger | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--button-trigger | porté | — | lot témoin |
| `components-combobox--chips` | Components/Combobox / Chips | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--chips | porté | — | lot témoin |
| `components-combobox--chips-open` | Components/Combobox / Chips Open | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--chips-open | porté | — | lot témoin |
| `components-combobox--exit` | Components/Combobox / Exit | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--exit | porté | — | lot témoin |
| `components-emptystate--default` | Components/EmptyState / Default | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--default | porté | — | lot témoin |
| `components-emptystate--with-action` | Components/EmptyState / With Action | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--with-action | porté | — | lot témoin |
| `components-emptystate--title-only` | Components/EmptyState / Title Only | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--title-only | porté | — | lot témoin |
| `components-emptystate--no-results` | Components/EmptyState / No Results | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--no-results | porté | — | lot témoin |
| `components-emptystate--long-text` | Components/EmptyState / Long Text | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--long-text | porté | — | lot témoin |
| `components-emptystate--custom-icon` | Components/EmptyState / Custom Icon | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--custom-icon | porté | — | lot témoin |
| `components-field--default` | Components/Field / Default | stories/components/ui/field.stories.tsx | gallery ?story=components-field--default | porté | — | lot témoin |
| `components-field--disabled` | Components/Field / Disabled | stories/components/ui/field.stories.tsx | gallery ?story=components-field--disabled | porté | — | lot témoin |
| `components-field--error-state` | Components/Field / Error | stories/components/ui/field.stories.tsx | gallery ?story=components-field--error-state | porté | — | lot témoin |
| `components-field--long-text` | Components/Field / Long Text | stories/components/ui/field.stories.tsx | gallery ?story=components-field--long-text | porté | — | lot témoin |
| `components-field--horizontal` | Components/Field / Horizontal | stories/components/ui/field.stories.tsx | gallery ?story=components-field--horizontal | porté | — | lot témoin |
| `components-field--form` | Components/Field / Form | stories/components/ui/field.stories.tsx | gallery ?story=components-field--form | porté | — | lot témoin |
| `components-field--choice-card` | Components/Field / Choice Card | stories/components/ui/field.stories.tsx | gallery ?story=components-field--choice-card | porté | — | lot témoin |
| `components-field--many-errors` | Components/Field / Many Errors | stories/components/ui/field.stories.tsx | gallery ?story=components-field--many-errors | porté | — | lot témoin |
| `components-gochevron--default` | Components/GoChevron / Default | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--default | porté | — | lot témoin |
| `components-gochevron--bare` | Components/GoChevron / Bare | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--bare | porté | — | lot témoin |
| `components-gochevron--long-text` | Components/GoChevron / Long Text | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--long-text | porté | — | lot témoin |
| `components-gochevron--many-items` | Components/GoChevron / Many Items | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--many-items | porté | — | lot témoin |
| `components-inputgroup--default` | Components/InputGroup / Default | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--default | porté | — | lot témoin |
| `components-inputgroup--disabled` | Components/InputGroup / Disabled | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--disabled | porté | — | lot témoin |
| `components-inputgroup--autofocused` | Components/InputGroup / Autofocused | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--autofocused | porté | — | lot témoin |
| `components-inputgroup--clicked` | Components/InputGroup / Clicked | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--clicked | porté | — | lot témoin |
| `components-inputgroup--error` | Components/InputGroup / Error | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--error | porté | — | lot témoin |
| `components-inputgroup--long-text` | Components/InputGroup / Long Text | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--long-text | porté | — | lot témoin |
| `components-inputgroup--with-button` | Components/InputGroup / With Button | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--with-button | porté | — | lot témoin |
| `components-inputgroup--with-text` | Components/InputGroup / With Text | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--with-text | porté | — | lot témoin |
| `components-inputgroup--textarea` | Components/InputGroup / Textarea | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--textarea | porté | — | lot témoin |
| `components-label--default` | Components/Label / Default | stories/components/ui/label.stories.tsx | gallery ?story=components-label--default | porté | — | lot témoin |
| `components-label--with-input` | Components/Label / With Input | stories/components/ui/label.stories.tsx | gallery ?story=components-label--with-input | porté | — | lot témoin |
| `components-label--with-checkbox` | Components/Label / With Checkbox | stories/components/ui/label.stories.tsx | gallery ?story=components-label--with-checkbox | porté | — | lot témoin |
| `components-label--disabled` | Components/Label / Disabled | stories/components/ui/label.stories.tsx | gallery ?story=components-label--disabled | porté | — | lot témoin |
| `components-label--long-text` | Components/Label / Long Text | stories/components/ui/label.stories.tsx | gallery ?story=components-label--long-text | porté | — | lot témoin |
| `components-mailboxicon--default` | Components/MailboxIcon / Default | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--default | porté | — | lot témoin |
| `components-mailboxicon--sizes` | Components/MailboxIcon / Sizes | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--sizes | porté | — | lot témoin |
| `components-mailboxicon--driven-by-parent` | Components/MailboxIcon / Driven By Parent | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--driven-by-parent | porté | — | lot témoin |
| `components-messagesquaremoreicon--default` | Components/MessageSquareMoreIcon / Default | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--default | porté | — | lot témoin |
| `components-messagesquaremoreicon--sizes` | Components/MessageSquareMoreIcon / Sizes | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--sizes | porté | — | lot témoin |
| `components-messagesquaremoreicon--driven-by-parent` | Components/MessageSquareMoreIcon / Driven By Parent | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--driven-by-parent | porté | — | lot témoin |
| `components-modelbadge--default` | Components/ModelBadge / Default | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--default | porté | — | lot témoin |
| `components-modelbadge--families` | Components/ModelBadge / Families | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--families | porté | — | lot témoin |
| `components-modelbadge--sizes` | Components/ModelBadge / Sizes | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--sizes | porté | — | lot témoin |
| `components-modelbadge--unknown` | Components/ModelBadge / Unknown | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--unknown | porté | — | lot témoin |
| `components-modelbadge--explicit-family` | Components/ModelBadge / Explicit Family | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--explicit-family | porté | — | lot témoin |
| `components-modelbadge--long-name` | Components/ModelBadge / Long Name | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--long-name | porté | — | lot témoin |
| `components-modelbadge--marks` | Components/ModelBadge / Marks | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--marks | porté | — | lot témoin |
| `components-pill--default` | Components/Pill / Default | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--default | porté | — | lot témoin |
| `components-pill--with-icon` | Components/Pill / With Icon | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--with-icon | porté | — | lot témoin |
| `components-pill--removable` | Components/Pill / Removable | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--removable | porté | — | lot témoin |
| `components-pill--status-dots` | Components/Pill / Status Dots | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--status-dots | porté | — | lot témoin |
| `components-pill--many-items` | Components/Pill / Many Items | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--many-items | porté | — | lot témoin |
| `components-pill--long-text` | Components/Pill / Long Text | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--long-text | porté | — | lot témoin |
| `components-pill--as-button` | Components/Pill / As Button | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--as-button | porté | — | lot témoin |
| `components-pill--sizes` | Components/Pill / Sizes | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--sizes | porté | — | lot témoin |
| `components-pill--trailing-action` | Components/Pill / Trailing Action | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--trailing-action | porté | — | lot témoin |
| `components-pill--raised` | Components/Pill / Raised | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--raised | porté | — | lot témoin |
| `components-progress--default` | Components/Progress / Default | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--default | porté | — | lot témoin |
| `components-progress--empty` | Components/Progress / Empty | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--empty | porté | — | lot témoin |
| `components-progress--complete` | Components/Progress / Complete | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--complete | porté | — | lot témoin |
| `components-progress--loading` | Components/Progress / Loading | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--loading | porté | — | lot témoin |
| `components-progress--long-text` | Components/Progress / Long Text | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--long-text | porté | — | lot témoin |
| `components-progress--bare-track` | Components/Progress / Bare Track | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--bare-track | porté | — | lot témoin |
| `components-progress--tones` | Components/Progress / Tones | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--tones | porté | — | lot témoin |
| `components-progress--many-items` | Components/Progress / Many Items | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--many-items | porté | — | lot témoin |
| `components-providermarks--all` | Components/ProviderMarks / All | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--all | porté | — | lot témoin |
| `components-providermarks--desktop-sizes` | Components/ProviderMarks / Desktop Sizes | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--desktop-sizes | porté | — | lot témoin |
| `components-providermarks--on-card` | Components/ProviderMarks / On Card | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--on-card | porté | — | lot témoin |
| `components-radiogroup--default` | Components/RadioGroup / Default | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--default | porté | — | lot témoin |
| `components-radiogroup--disabled` | Components/RadioGroup / Disabled | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--disabled | porté | — | lot témoin |
| `components-radiogroup--error` | Components/RadioGroup / Error | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--error | porté | — | lot témoin |
| `components-radiogroup--long-text` | Components/RadioGroup / Long Text | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--long-text | porté | — | lot témoin |
| `components-radiogroup--many-items` | Components/RadioGroup / Many Items | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--many-items | porté | — | lot témoin |
| `components-separator--default` | Components/Separator / Default | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--default | porté | — | lot témoin |
| `components-separator--strong` | Components/Separator / Strong | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--strong | porté | — | lot témoin |
| `components-separator--vertical` | Components/Separator / Vertical | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--vertical | porté | — | lot témoin |
| `components-sheet--default` | Components/Sheet / Default | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--default | porté | — | lot témoin |
| `components-sheet--open` | Components/Sheet / Open | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--open | porté | — | lot témoin |
| `components-sheet--left` | Components/Sheet / Left | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--left | porté | — | lot témoin |
| `components-sheet--bottom` | Components/Sheet / Bottom | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--bottom | porté | — | lot témoin |
| `components-sheet--long-text` | Components/Sheet / Long Text | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--long-text | porté | — | lot témoin |
| `components-skeleton--default` | Components/Skeleton / Default | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--default | porté | — | lot témoin |
| `components-skeleton--loading` | Components/Skeleton / Loading | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--loading | porté | — | lot témoin |
| `components-skeleton--static-panel` | Components/Skeleton / Static Panel | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--static-panel | porté | — | lot témoin |
| `components-skeleton--card` | Components/Skeleton / Card | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--card | porté | — | lot témoin |
| `components-spinner--default` | Components/Spinner / Default | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--default | porté | — | lot témoin |
| `components-spinner--sizes` | Components/Spinner / Sizes | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--sizes | porté | — | lot témoin |
| `components-spinner--in-button` | Components/Spinner / In Button | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--in-button | porté | — | lot témoin |
| `components-spinner--with-text` | Components/Spinner / With Text | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--with-text | porté | — | lot témoin |
| `components-statusdot--default` | Components/StatusDot / Default | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-statusdot--tones` | Components/StatusDot / Tones | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--tones | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-statusdot--sizes` | Components/StatusDot / Sizes | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--sizes | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-statusdot--presence` | Components/StatusDot / Presence | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--presence | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-statusdot--on-an-icon` | Components/StatusDot / On An Icon | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--on-an-icon | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-statusicon--default` | Components/StatusIcon / Default | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--default | porté | — | lot témoin |
| `components-statusicon--error` | Components/StatusIcon / Error | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--error | porté | — | lot témoin |
| `components-statusicon--all-statuses` | Components/StatusIcon / All Statuses | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--all-statuses | porté | — | lot témoin |
| `components-statusicon--priorities` | Components/StatusIcon / Priorities | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--priorities | porté | — | lot témoin |
| `components-statusicon--many-items` | Components/StatusIcon / Many Items | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--many-items | porté | — | lot témoin |
| `components-steplist--running` | Components/StepList / Running | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--running | vérifié | 1/2 identiques, max 0.000 % | lot témoin |
| `components-steplist--starting` | Components/StepList / Starting | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--starting | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-steplist--done` | Components/StepList / Done | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--done | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-steplist--failed` | Components/StepList / Failed | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--failed | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-steplist--live` | Components/StepList / Live | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--live | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-table--default` | Components/Table / Default | stories/components/ui/table.stories.tsx | gallery ?story=components-table--default | porté | — | lot témoin |
| `components-table--with-footer` | Components/Table / With Footer | stories/components/ui/table.stories.tsx | gallery ?story=components-table--with-footer | porté | — | lot témoin |
| `components-table--selected` | Components/Table / Selected | stories/components/ui/table.stories.tsx | gallery ?story=components-table--selected | porté | — | lot témoin |
| `components-table--empty` | Components/Table / Empty | stories/components/ui/table.stories.tsx | gallery ?story=components-table--empty | porté | — | lot témoin |
| `components-table--long-text` | Components/Table / Long Text | stories/components/ui/table.stories.tsx | gallery ?story=components-table--long-text | porté | — | lot témoin |
| `components-table--many-items` | Components/Table / Many Items | stories/components/ui/table.stories.tsx | gallery ?story=components-table--many-items | porté | — | lot témoin |
| `components-tabs--default` | Components/Tabs / Default | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--default | porté | — | lot témoin |
| `components-tabs--small` | Components/Tabs / Small | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--small | porté | — | lot témoin |
| `components-tabs--segmented-with-icons` | Components/Tabs / Segmented With Icons | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--segmented-with-icons | porté | — | lot témoin |
| `components-tabs--line` | Components/Tabs / Line | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--line | porté | — | lot témoin |
| `components-tabs--disabled` | Components/Tabs / Disabled | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--disabled | porté | — | lot témoin |
| `components-tabs--long-text` | Components/Tabs / Long Text | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--long-text | porté | — | lot témoin |
| `components-tabs--many-items` | Components/Tabs / Many Items | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--many-items | porté | — | lot témoin |
| `components-tag--default` | Components/Tag / Default | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--default | porté | — | lot témoin |
| `components-tag--with-dot` | Components/Tag / With Dot | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--with-dot | porté | — | lot témoin |
| `components-tag--no-hue` | Components/Tag / No Hue | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--no-hue | porté | — | lot témoin |
| `components-tag--all-hues` | Components/Tag / All Hues | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--all-hues | porté | — | lot témoin |
| `components-tag--every-theme` | Components/Tag / Every Theme | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--every-theme | porté | — | lot témoin |
| `components-tag--label-marks` | Components/Tag / Label Marks | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--label-marks | porté | — | lot témoin |
| `components-tag--dots` | Components/Tag / Dots | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--dots | porté | — | lot témoin |
| `components-tag--long-text` | Components/Tag / Long Text | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--long-text | porté | — | lot témoin |
| `components-textlink--default` | Components/TextLink / Default | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--default | porté | — | lot témoin |
| `components-textlink--muted` | Components/TextLink / Muted | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--muted | porté | — | lot témoin |
| `components-textlink--standalone-and-prose` | Components/TextLink / Standalone And Prose | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--standalone-and-prose | porté | — | lot témoin |
| `components-textarea--default` | Components/Textarea / Default | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--default | porté | — | lot témoin |
| `components-textarea--disabled` | Components/Textarea / Disabled | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--disabled | porté | — | lot témoin |
| `components-textarea--error` | Components/Textarea / Error | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--error | porté | — | lot témoin |
| `components-textarea--long-text` | Components/Textarea / Long Text | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--long-text | porté | — | lot témoin |
| `components-toast--default` | Components/Toast / Default | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-toast--open` | Components/Toast / Open | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--open | vérifié | 0/2 identiques, max 0.000 % | lot témoin |
| `components-toast--error` | Components/Toast / Error | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--error | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-toast--loading` | Components/Toast / Loading | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--loading | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-toast--many-items` | Components/Toast / Many Items | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--many-items | vérifié | 0/2 identiques, max 0.000 % | lot témoin |
| `components-toast--long-text` | Components/Toast / Long Text | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--long-text | écart identifié | 1/2 identiques, max 1.082 % | lot témoin |
| `components-toast--composition` | Components/Toast / Composition | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--composition | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `components-togglegroup--default` | Components/ToggleGroup / Default | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--default | porté | — | lot témoin |
| `components-togglegroup--outline` | Components/ToggleGroup / Outline | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--outline | porté | — | lot témoin |
| `components-togglegroup--joined` | Components/ToggleGroup / Joined | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--joined | porté | — | lot témoin |
| `components-togglegroup--vertical` | Components/ToggleGroup / Vertical | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--vertical | porté | — | lot témoin |
| `components-togglegroup--disabled` | Components/ToggleGroup / Disabled | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--disabled | porté | — | lot témoin |
| `components-togglegroup--multiple` | Components/ToggleGroup / Multiple | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--multiple | porté | — | lot témoin |
| `components-togglegroup--with-text` | Components/ToggleGroup / With Text | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--with-text | porté | — | lot témoin |
| `components-toggle--default` | Components/Toggle / Default | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--default | porté | — | lot témoin |
| `components-toggle--pressed` | Components/Toggle / Pressed | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--pressed | porté | — | lot témoin |
| `components-toggle--outline` | Components/Toggle / Outline | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--outline | porté | — | lot témoin |
| `components-toggle--disabled` | Components/Toggle / Disabled | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--disabled | porté | — | lot témoin |
| `components-toggle--with-icon` | Components/Toggle / With Icon | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--with-icon | porté | — | lot témoin |
| `components-toggle--sizes` | Components/Toggle / Sizes | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--sizes | porté | — | lot témoin |
| `components-toggle--long-text` | Components/Toggle / Long Text | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--long-text | porté | — | lot témoin |
| `components-uploadicon--default` | Components/UploadIcon / Default | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--default | porté | — | lot témoin |
| `components-uploadicon--sizes` | Components/UploadIcon / Sizes | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--sizes | porté | — | lot témoin |
| `components-uploadicon--driven-by-parent` | Components/UploadIcon / Driven By Parent | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--driven-by-parent | porté | — | lot témoin |
| `patterns-terminalcommandinput--idle` | Patterns/TerminalCommandInput / Idle | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--idle | porté | — | lot témoin |
| `patterns-terminalcommandinput--busy` | Patterns/TerminalCommandInput / Busy | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--busy | porté | — | lot témoin |
| `patterns-terminalcommandinput--raw-mode` | Patterns/TerminalCommandInput / Raw Mode | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--raw-mode | porté | — | lot témoin |
| `patterns-terminalcommandinput--with-status` | Patterns/TerminalCommandInput / With Status | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--with-status | porté | — | lot témoin |
| `patterns-terminalcommandinput--suggestions` | Patterns/TerminalCommandInput / Suggestions | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--suggestions | porté | — | lot témoin |
| `patterns-terminalcommandinput--narrow-status` | Patterns/TerminalCommandInput / Narrow Status | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--narrow-status | porté | — | lot témoin |
| `patterns-commandsuggestions--default` | Patterns/CommandSuggestions / Default | stories/components/code-surface/command-suggestions.stories.tsx | gallery ?story=patterns-commandsuggestions--default | porté | — | lot témoin |
| `patterns-editorbreadcrumbs--short` | Patterns/EditorBreadcrumbs / Short | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--short | porté | — | lot témoin |
| `patterns-editorbreadcrumbs--collapsed` | Patterns/EditorBreadcrumbs / Collapsed | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--collapsed | porté | — | lot témoin |
| `patterns-editorbreadcrumbs--clickable` | Patterns/EditorBreadcrumbs / Clickable | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--clickable | porté | — | lot témoin |
| `patterns-editorframe--default` | Patterns/EditorFrame / Default | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--default | porté | — | lot témoin |
| `patterns-editorframe--dirty` | Patterns/EditorFrame / Dirty | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--dirty | porté | — | lot témoin |
| `patterns-editorframe--disk-changed` | Patterns/EditorFrame / Disk Changed | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--disk-changed | porté | — | lot témoin |
| `patterns-editorframe--markdown-toggle` | Patterns/EditorFrame / Markdown Toggle | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--markdown-toggle | porté | — | lot témoin |
| `patterns-editorframe--with-find` | Patterns/EditorFrame / With Find | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--with-find | porté | — | lot témoin |
| `patterns-editorframe--with-replace` | Patterns/EditorFrame / With Replace | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--with-replace | porté | — | lot témoin |
| `patterns-editorframe--long-path` | Patterns/EditorFrame / Long Path | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--long-path | porté | — | lot témoin |
| `patterns-editorframe--phone` | Patterns/EditorFrame / Phone | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--phone | porté | — | lot témoin |
| `patterns-editorpreview--all-syntax-roles` | Patterns/EditorPreview / All Syntax Roles | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--all-syntax-roles | porté | — | lot témoin |
| `patterns-editorpreview--gutter` | Patterns/EditorPreview / Gutter | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--gutter | porté | — | lot témoin |
| `patterns-editorpreview--selection-and-matches` | Patterns/EditorPreview / Selection And Matches | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--selection-and-matches | porté | — | lot témoin |
| `patterns-editorstatusbar--default` | Patterns/EditorStatusBar / Default | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--default | porté | — | lot témoin |
| `patterns-editorstatusbar--selection` | Patterns/EditorStatusBar / Selection | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--selection | porté | — | lot témoin |
| `patterns-editorstatusbar--clickable` | Patterns/EditorStatusBar / Clickable | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--clickable | porté | — | lot témoin |
| `patterns-findbar--matches` | Patterns/FindBar / Matches | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--matches | porté | — | lot témoin |
| `patterns-findbar--no-results` | Patterns/FindBar / No Results | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--no-results | porté | — | lot témoin |
| `patterns-findbar--invalid-regex` | Patterns/FindBar / Invalid Regex | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--invalid-regex | porté | — | lot témoin |
| `patterns-findbar--replace` | Patterns/FindBar / Replace | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--replace | porté | — | lot témoin |
| `patterns-findbar--find-only` | Patterns/FindBar / Find Only | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--find-only | porté | — | lot témoin |
| `patterns-findbar--select-all` | Patterns/FindBar / Select All | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--select-all | porté | — | lot témoin |
| `patterns-terminalblock--running` | Patterns/TerminalBlock / Running | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--running | porté | — | lot témoin |
| `patterns-terminalblock--succeeded` | Patterns/TerminalBlock / Succeeded | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--succeeded | porté | — | lot témoin |
| `patterns-terminalblock--failed` | Patterns/TerminalBlock / Failed | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--failed | porté | — | lot témoin |
| `patterns-terminalblock--collapsed` | Patterns/TerminalBlock / Collapsed | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--collapsed | porté | — | lot témoin |
| `patterns-terminalblock--no-header` | Patterns/TerminalBlock / No Header | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--no-header | porté | — | lot témoin |
| `patterns-terminalblock--ansi-colours` | Patterns/TerminalBlock / Ansi Colours | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--ansi-colours | porté | — | lot témoin |
| `patterns-terminalblock--hidden-lines` | Patterns/TerminalBlock / Hidden Lines | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--hidden-lines | porté | — | lot témoin |
| `patterns-terminalblock--large-output-badge` | Patterns/TerminalBlock / Large Output Badge | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--large-output-badge | porté | — | lot témoin |
| `patterns-terminalblock--password-prompt` | Patterns/TerminalBlock / Password Prompt | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--password-prompt | porté | — | lot témoin |
| `patterns-terminalblock--long-output` | Patterns/TerminalBlock / Long Output | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--long-output | porté | — | lot témoin |
| `patterns-terminalblock--from-tool-call` | Patterns/TerminalBlock / From Tool Call | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--from-tool-call | porté | — | lot témoin |
| `patterns-terminalblock--session` | Patterns/TerminalBlock / Session | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--session | porté | — | lot témoin |
| `patterns-terminalblock--styled-runs` | Patterns/TerminalBlock / Styled Runs | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--styled-runs | porté | — | lot témoin |
| `patterns-terminalblock--links` | Patterns/TerminalBlock / Links | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--links | porté | — | lot témoin |
| `patterns-terminalblock--search-highlight` | Patterns/TerminalBlock / Search Highlight | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--search-highlight | porté | — | lot témoin |
| `patterns-terminalblock--inverse` | Patterns/TerminalBlock / Inverse | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--inverse | porté | — | lot témoin |
| `patterns-terminalblock--memoised-lines` | Patterns/TerminalBlock / Memoised Lines | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--memoised-lines | porté | — | lot témoin |
| `patterns-terminalblock--command-highlight` | Patterns/TerminalBlock / Command Highlight | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--command-highlight | porté | — | lot témoin |
| `patterns-terminalpalette--default` | Patterns/TerminalPalette / Default | stories/components/code-surface/terminal-palette.stories.tsx | gallery ?story=patterns-terminalpalette--default | porté | — | lot témoin |
| `patterns-terminalstopcontrol--ready` | Patterns/TerminalStopControl / Ready | stories/components/code-surface/terminal-stop-control.stories.tsx | gallery ?story=patterns-terminalstopcontrol--ready | porté | — | lot témoin |
| `patterns-commandpalette--default` | Patterns/CommandPalette / Default | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--default | porté | — | lot témoin |
| `patterns-commandpalette--filtered` | Patterns/CommandPalette / Filtered | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--filtered | porté | — | lot témoin |
| `patterns-commandpalette--with-recent` | Patterns/CommandPalette / With Recent | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--with-recent | porté | — | lot témoin |
| `patterns-commandpalette--nested-pages` | Patterns/CommandPalette / Nested Pages | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--nested-pages | porté | — | lot témoin |
| `patterns-commandpalette--disabled-items` | Patterns/CommandPalette / Disabled Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--disabled-items | porté | — | lot témoin |
| `patterns-commandpalette--loading` | Patterns/CommandPalette / Loading | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--loading | porté | — | lot témoin |
| `patterns-commandpalette--loading-with-results` | Patterns/CommandPalette / Loading With Results | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--loading-with-results | porté | — | lot témoin |
| `patterns-commandpalette--no-items` | Patterns/CommandPalette / No Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--no-items | porté | — | lot témoin |
| `patterns-commandpalette--no-matches` | Patterns/CommandPalette / No Matches | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--no-matches | porté | — | lot témoin |
| `patterns-commandpalette--long-labels` | Patterns/CommandPalette / Long Labels | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--long-labels | porté | — | lot témoin |
| `patterns-commandpalette--many-items` | Patterns/CommandPalette / Many Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--many-items | porté | — | lot témoin |
| `patterns-commandpalette--new-tab` | Patterns/CommandPalette / New Tab | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--new-tab | porté | — | lot témoin |
| `patterns-commandpalette--view-only` | Patterns/CommandPalette / View Only | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--view-only | porté | — | lot témoin |
| `patterns-commandpalette--inline-list` | Patterns/CommandPalette / Inline List | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--inline-list | porté | — | lot témoin |
| `patterns-commandpalette--rows` | Patterns/CommandPalette / Rows | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--rows | porté | — | lot témoin |
| `patterns-datatable--default` | Patterns/DataTable / Default | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--default | porté | — | lot témoin |
| `patterns-datatable--empty` | Patterns/DataTable / Empty | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--empty | porté | — | lot témoin |
| `patterns-datatable--many-items` | Patterns/DataTable / Many Items | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--many-items | porté | — | lot témoin |
| `patterns-datatable--bare` | Patterns/DataTable / Bare | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--bare | porté | — | lot témoin |
| `patterns-datatable--long-text` | Patterns/DataTable / Long Text | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--long-text | porté | — | lot témoin |
| `patterns-datatable--narrow` | Patterns/DataTable / Narrow | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--narrow | porté | — | lot témoin |
| `patterns-datatable--server-sorted` | Patterns/DataTable / Server Sorted | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--server-sorted | porté | — | lot témoin |
| `patterns-dotmatrix--default` | Patterns/DotMatrix / Default | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--default | porté | — | lot témoin |
| `patterns-dotmatrix--empty` | Patterns/DotMatrix / Empty | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--empty | porté | — | lot témoin |
| `patterns-dotmatrix--with-gaps` | Patterns/DotMatrix / With Gaps | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--with-gaps | porté | — | lot témoin |
| `patterns-dotmatrix--many-items` | Patterns/DotMatrix / Many Items | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--many-items | porté | — | lot témoin |
| `patterns-dotmatrix--meter` | Patterns/DotMatrix / Meter | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--meter | porté | — | lot témoin |
| `patterns-dotmatrix--gauge` | Patterns/DotMatrix / Gauge | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--gauge | porté | — | lot témoin |
| `patterns-dotmatrix--meter-hues` | Patterns/DotMatrix / Meter Hues | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--meter-hues | porté | — | lot témoin |
| `patterns-hintoverlay--default` | Patterns/HintOverlay / Default | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--default | porté | — | lot témoin |
| `patterns-hintoverlay--open` | Patterns/HintOverlay / Open | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--open | porté | — | lot témoin |
| `patterns-hintoverlay--two-char-labels` | Patterns/HintOverlay / Two Char Labels | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--two-char-labels | porté | — | lot témoin |
| `patterns-hintoverlay--scrolled` | Patterns/HintOverlay / Scrolled | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--scrolled | porté | — | lot témoin |
| `patterns-kpistrip--default` | Patterns/KpiStrip / Default | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--default | porté | — | lot témoin |
| `patterns-kpistrip--no-previous-period` | Patterns/KpiStrip / No Previous Period | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--no-previous-period | porté | — | lot témoin |
| `patterns-kpistrip--single` | Patterns/KpiStrip / Single | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--single | porté | — | lot témoin |
| `patterns-kpistrip--many-items` | Patterns/KpiStrip / Many Items | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--many-items | porté | — | lot témoin |
| `patterns-kpistrip--long-text` | Patterns/KpiStrip / Long Text | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--long-text | porté | — | lot témoin |
| `patterns-kpistrip--chips` | Patterns/KpiStrip / Chips | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--chips | porté | — | lot témoin |
| `patterns-kpistrip--tones` | Patterns/KpiStrip / Tones | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--tones | porté | — | lot témoin |
| `patterns-kpistrip--with-tones` | Patterns/KpiStrip / With Tones | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--with-tones | porté | — | lot témoin |
| `patterns-nextpage--scrolling` | Patterns/NextPage / Scrolling | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--scrolling | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-nextpage--fails-once` | Patterns/NextPage / Fails Once | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--fails-once | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-nextpage--loading` | Patterns/NextPage / Loading | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--loading | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-nextpage--failed` | Patterns/NextPage / Failed | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--failed | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--default` | Patterns/Panel / Default | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--untitled` | Patterns/Panel / Untitled | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--untitled | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--with-actions` | Patterns/Panel / With Actions | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--with-actions | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--empty` | Patterns/Panel / Empty | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--empty | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--long-text` | Patterns/Panel / Long Text | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-panel--stagger` | Patterns/Panel / Stagger | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--stagger | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--default` | Patterns/PersonAvatar / Default | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--with-photo` | Patterns/PersonAvatar / With Photo | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--with-photo | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--error` | Patterns/PersonAvatar / Error | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--error | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--email-only` | Patterns/PersonAvatar / Email Only | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--email-only | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--sizes` | Patterns/PersonAvatar / Sizes | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--sizes | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-personavatar--long-text` | Patterns/PersonAvatar / Long Text | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-rail--default` | Patterns/Rail / Default | stories/components/patterns/rail.stories.tsx | gallery ?story=patterns-rail--default | porté | — | lot témoin |
| `patterns-searchoverlay--default` | Patterns/SearchOverlay / Default | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--default | porté | — | lot témoin |
| `patterns-searchoverlay--find-in-files-idle` | Patterns/SearchOverlay / Find In Files Idle | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-files-idle | porté | — | lot témoin |
| `patterns-searchoverlay--find-in-files-no-recents` | Patterns/SearchOverlay / Find In Files No Recents | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-files-no-recents | porté | — | lot témoin |
| `patterns-searchoverlay--searching` | Patterns/SearchOverlay / Searching | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--searching | porté | — | lot témoin |
| `patterns-searchoverlay--results` | Patterns/SearchOverlay / Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--results | porté | — | lot témoin |
| `patterns-searchoverlay--no-results` | Patterns/SearchOverlay / No Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--no-results | porté | — | lot témoin |
| `patterns-searchoverlay--failed` | Patterns/SearchOverlay / Failed | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--failed | porté | — | lot témoin |
| `patterns-searchoverlay--find-in-chat` | Patterns/SearchOverlay / Find In Chat | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-chat | porté | — | lot témoin |
| `patterns-searchoverlay--many-results` | Patterns/SearchOverlay / Many Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--many-results | porté | — | lot témoin |
| `patterns-searchoverlay--result-rows` | Patterns/SearchOverlay / Result Rows | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--result-rows | porté | — | lot témoin |
| `patterns-sectionheader--default` | Patterns/SectionHeader / Default | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--default | porté | — | lot témoin |
| `patterns-sectionheader--title-only` | Patterns/SectionHeader / Title Only | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--title-only | porté | — | lot témoin |
| `patterns-sectionheader--with-action` | Patterns/SectionHeader / With Action | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--with-action | porté | — | lot témoin |
| `patterns-sectionheader--with-icon` | Patterns/SectionHeader / With Icon | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--with-icon | porté | — | lot témoin |
| `patterns-sectionheader--long-text` | Patterns/SectionHeader / Long Text | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--long-text | porté | — | lot témoin |
| `patterns-sectionheader--page` | Patterns/SectionHeader / Page | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--page | porté | — | lot témoin |
| `patterns-segmented--default` | Patterns/Segmented / Default | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--default | porté | — | lot témoin |
| `patterns-segmented--many-items` | Patterns/Segmented / Many Items | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--many-items | porté | — | lot témoin |
| `patterns-segmented--filters` | Patterns/Segmented / Filters | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--filters | porté | — | lot témoin |
| `patterns-segmented--icon-group` | Patterns/Segmented / Icon Group | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--icon-group | porté | — | lot témoin |
| `patterns-segmented--disabled` | Patterns/Segmented / Disabled | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--disabled | porté | — | lot témoin |
| `patterns-settingcard--default` | Patterns/SettingCard / Default | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-settingcard--disabled` | Patterns/SettingCard / Disabled | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--disabled | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-settingcard--long-text` | Patterns/SettingCard / Long Text | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-settingcard--many-items` | Patterns/SettingCard / Many Items | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--many-items | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-settingcard--narrow` | Patterns/SettingCard / Narrow | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--narrow | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `patterns-statcard--default` | Patterns/StatCard / Default | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--default | porté | — | lot témoin |
| `patterns-statcard--with-badge` | Patterns/StatCard / With Badge | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--with-badge | porté | — | lot témoin |
| `patterns-statcard--empty` | Patterns/StatCard / Empty | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--empty | porté | — | lot témoin |
| `patterns-statcard--long-text` | Patterns/StatCard / Long Text | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--long-text | porté | — | lot témoin |
| `patterns-statcard--grid` | Patterns/StatCard / Grid | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--grid | porté | — | lot témoin |
| `patterns-statcard--meters` | Patterns/StatCard / Meters | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--meters | porté | — | lot témoin |
| `patterns-statcard--meter-no-hue` | Patterns/StatCard / Meter No Hue | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--meter-no-hue | porté | — | lot témoin |
| `blocks-checkpointtrace--org-week` | Blocks/CheckpointTrace / Org Week | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--org-week | porté | — | lot témoin |
| `blocks-checkpointtrace--keyboard` | Blocks/CheckpointTrace / Keyboard | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--keyboard | porté | — | lot témoin |
| `blocks-checkpointtrace--pan-and-zoom` | Blocks/CheckpointTrace / Pan And Zoom | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--pan-and-zoom | porté | — | lot témoin |
| `blocks-checkpointtrace--project-day` | Blocks/CheckpointTrace / Project Day | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--project-day | porté | — | lot témoin |
| `blocks-checkpointtrace--live` | Blocks/CheckpointTrace / Live | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--live | porté | — | lot témoin |
| `blocks-checkpointtrace--dense-clustering` | Blocks/CheckpointTrace / Dense Clustering | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--dense-clustering | porté | — | lot témoin |
| `blocks-checkpointtrace--group-by-person` | Blocks/CheckpointTrace / Group By Person | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--group-by-person | porté | — | lot témoin |
| `blocks-checkpointtrace--group-by-project` | Blocks/CheckpointTrace / Group By Project | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--group-by-project | porté | — | lot témoin |
| `blocks-checkpointtrace--empty` | Blocks/CheckpointTrace / Empty | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--empty | porté | — | lot témoin |
| `blocks-checkpointtrace--loading` | Blocks/CheckpointTrace / Loading | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--loading | porté | — | lot témoin |
| `blocks-checkpointtrace--error-state` | Blocks/CheckpointTrace / Error State | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--error-state | porté | — | lot témoin |
| `blocks-checkpointtrace--error-with-retry` | Blocks/CheckpointTrace / Error With Retry | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--error-with-retry | porté | — | lot témoin |
| `blocks-checkpointtrace--long-titles` | Blocks/CheckpointTrace / Long Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--long-titles | porté | — | lot témoin |
| `blocks-checkpointtrace--team-week` | Blocks/CheckpointTrace / Team Week | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--team-week | porté | — | lot témoin |
| `blocks-checkpointtrace--dense-clusters-with-titles` | Blocks/CheckpointTrace / Dense Clusters With Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--dense-clusters-with-titles | porté | — | lot témoin |
| `blocks-checkpointtrace--mixed-titles` | Blocks/CheckpointTrace / Mixed Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--mixed-titles | porté | — | lot témoin |
| `blocks-checkpointtrace--compact` | Blocks/CheckpointTrace / Compact | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--compact | porté | — | lot témoin |
| `blocks-checkpointtrace--many-sessions` | Blocks/CheckpointTrace / Many Sessions | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--many-sessions | porté | — | lot témoin |
| `blocks-checkpointtrace--placeholder-initials` | Blocks/CheckpointTrace / Placeholder Initials | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--placeholder-initials | porté | — | lot témoin |
| `blocks-dashedrails--default` | Blocks/DashedRails / Default | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--default | porté | — | lot témoin |
| `blocks-dashedrails--faded` | Blocks/DashedRails / Faded | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--faded | porté | — | lot témoin |
| `blocks-dashedrails--fixed-offset` | Blocks/DashedRails / Fixed Offset | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--fixed-offset | porté | — | lot témoin |
| `blocks-ghostcards--default` | Blocks/GhostCards / Default | stories/components/blocks/ghost-cards.stories.tsx | gallery ?story=blocks-ghostcards--default | porté | — | lot témoin |
| `blocks-ghostcards--long-text` | Blocks/GhostCards / Long Text | stories/components/blocks/ghost-cards.stories.tsx | gallery ?story=blocks-ghostcards--long-text | porté | — | lot témoin |
| `blocks-globe--default` | Blocks/Globe / Default | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--default | porté | — | lot témoin |
| `blocks-globe--empty` | Blocks/Globe / Empty | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--empty | porté | — | lot témoin |
| `blocks-globe--still` | Blocks/Globe / Still | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--still | porté | — | lot témoin |
| `blocks-globe--long-text` | Blocks/Globe / Long Text | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--long-text | porté | — | lot témoin |
| `blocks-globe--no-webgl` | Blocks/Globe / No Webgl | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--no-webgl | porté | — | lot témoin |
| `blocks-globe--custom-fallback` | Blocks/Globe / Custom Fallback | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--custom-fallback | porté | — | lot témoin |
| `blocks-gradualblur--bottom` | Blocks/GradualBlur / Bottom | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--bottom | porté | — | lot témoin |
| `blocks-gradualblur--top` | Blocks/GradualBlur / Top | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--top | porté | — | lot témoin |
| `blocks-gradualblur--tinted` | Blocks/GradualBlur / Tinted | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--tinted | porté | — | lot témoin |
| `blocks-gradualblur--off` | Blocks/GradualBlur / Off | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--off | porté | — | lot témoin |
| `blocks-infiniteslider--default` | Blocks/InfiniteSlider / Default | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--default | porté | — | lot témoin |
| `blocks-infiniteslider--reverse` | Blocks/InfiniteSlider / Reverse | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--reverse | porté | — | lot témoin |
| `blocks-infiniteslider--vertical` | Blocks/InfiniteSlider / Vertical | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--vertical | porté | — | lot témoin |
| `blocks-infiniteslider--many-items` | Blocks/InfiniteSlider / Many Items | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--many-items | porté | — | lot témoin |
| `blocks-infiniteslider--capped` | Blocks/InfiniteSlider / Capped | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--capped | porté | — | lot témoin |
| `blocks-plusdecorator--default` | Blocks/PlusDecorator / Default | stories/components/blocks/plus-decorator.stories.tsx | gallery ?story=blocks-plusdecorator--default | porté | — | lot témoin |
| `blocks-plusdecorator--all-corners` | Blocks/PlusDecorator / All Corners | stories/components/blocks/plus-decorator.stories.tsx | gallery ?story=blocks-plusdecorator--all-corners | porté | — | lot témoin |
| `blocks-scrollrail--default` | Blocks/ScrollRail / Default | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--default | porté | — | lot témoin |
| `blocks-scrollrail--halfway` | Blocks/ScrollRail / Halfway | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--halfway | porté | — | lot témoin |
| `blocks-scrollrail--empty` | Blocks/ScrollRail / Empty | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--empty | porté | — | lot témoin |
| `blocks-timelinecalendar--default` | Blocks/TimelineCalendar / Default | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--default | porté | — | lot témoin |
| `blocks-timelinecalendar--empty` | Blocks/TimelineCalendar / Empty | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--empty | porté | — | lot témoin |
| `blocks-timelinecalendar--long-text` | Blocks/TimelineCalendar / Long Text | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--long-text | porté | — | lot témoin |
| `blocks-timelinecalendar--many-items` | Blocks/TimelineCalendar / Many Items | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--many-items | porté | — | lot témoin |
| `blocks-timelinecalendar--scrolled` | Blocks/TimelineCalendar / Scrolled | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--scrolled | porté | — | lot témoin |
| `blocks-timelinecalendar--flush` | Blocks/TimelineCalendar / Flush | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--flush | porté | — | lot témoin |
| `blocks-timelinecalendar--scrolled-to-end` | Blocks/TimelineCalendar / Scrolled To End | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--scrolled-to-end | porté | — | lot témoin |
| `blocks-timelinecalendar--measured-end` | Blocks/TimelineCalendar / Measured End | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--measured-end | porté | — | lot témoin |
| `blocks-canvas-action-pill--alone` | Blocks/Canvas action pill / Alone | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--alone | porté | — | lot témoin |
| `blocks-canvas-action-pill--three-peers` | Blocks/Canvas action pill / Three Peers | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--three-peers | porté | — | lot témoin |
| `blocks-canvas-action-pill--overflow` | Blocks/Canvas action pill / Overflow | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--overflow | porté | — | lot témoin |
| `blocks-canvas-action-pill--following` | Blocks/Canvas action pill / Following | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--following | porté | — | lot témoin |
| `blocks-canvas-action-pill--followed-by` | Blocks/Canvas action pill / Followed By | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--followed-by | porté | — | lot témoin |
| `blocks-canvas-action-pill--exporting` | Blocks/Canvas action pill / Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--exporting | porté | — | lot témoin |
| `blocks-canvas-action-pill--export-labelled` | Blocks/Canvas action pill / Export Labelled | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-labelled | porté | — | lot témoin |
| `blocks-canvas-action-pill--export-labelled-exporting` | Blocks/Canvas action pill / Export Labelled Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-labelled-exporting | porté | — | lot témoin |
| `blocks-canvas-action-pill--export-only` | Blocks/Canvas action pill / Export Only | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-only | porté | — | lot témoin |
| `blocks-canvas-board--spaces` | Blocks/Canvas board / Spaces | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--spaces | porté | — | lot témoin |
| `blocks-canvas-board--local-canvas` | Blocks/Canvas board / Local Canvas | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--local-canvas | porté | — | lot témoin |
| `blocks-canvas-board--empty-page` | Blocks/Canvas board / Empty Page | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--empty-page | porté | — | lot témoin |
| `blocks-canvas-board--phone` | Blocks/Canvas board / Phone | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--phone | porté | — | lot témoin |
| `blocks-canvas-chrome--pieces` | Blocks/Canvas chrome / Pieces | stories/components/canvas/canvas-chrome.stories.tsx | gallery ?story=blocks-canvas-chrome--pieces | porté | — | lot témoin |
| `blocks-canvas-header--live` | Blocks/Canvas header / Live | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--live | porté | — | lot témoin |
| `blocks-canvas-header--syncing` | Blocks/Canvas header / Syncing | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--syncing | porté | — | lot témoin |
| `blocks-canvas-header--offline` | Blocks/Canvas header / Offline | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--offline | porté | — | lot témoin |
| `blocks-canvas-header--offline-error` | Blocks/Canvas header / Offline Error | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--offline-error | porté | — | lot témoin |
| `blocks-canvas-header--archived` | Blocks/Canvas header / Archived | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--archived | porté | — | lot témoin |
| `blocks-canvas-header--viewing` | Blocks/Canvas header / Viewing | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--viewing | porté | — | lot témoin |
| `blocks-canvas-header--local-canvas` | Blocks/Canvas header / Local Canvas | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--local-canvas | porté | — | lot témoin |
| `blocks-canvas-header--long-page-name` | Blocks/Canvas header / Long Page Name | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--long-page-name | porté | — | lot témoin |
| `blocks-canvas-header--page-switcher` | Blocks/Canvas header / Page Switcher | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--page-switcher | porté | — | lot témoin |
| `blocks-canvas-header--page-switcher-empty` | Blocks/Canvas header / Page Switcher Empty | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--page-switcher-empty | porté | — | lot témoin |
| `blocks-canvas-minimap--default` | Blocks/Canvas minimap / Default | stories/components/canvas/canvas-minimap.stories.tsx | gallery ?story=blocks-canvas-minimap--default | porté | — | lot témoin |
| `blocks-canvas-minimap--empty` | Blocks/Canvas minimap / Empty | stories/components/canvas/canvas-minimap.stories.tsx | gallery ?story=blocks-canvas-minimap--empty | porté | — | lot témoin |
| `blocks-canvas-nodes--note` | Blocks/Canvas nodes / Note | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note | porté | — | lot témoin |
| `blocks-canvas-nodes--note-empty` | Blocks/Canvas nodes / Note Empty | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-empty | porté | — | lot témoin |
| `blocks-canvas-nodes--note-selected` | Blocks/Canvas nodes / Note Selected | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-selected | porté | — | lot témoin |
| `blocks-canvas-nodes--note-claimed` | Blocks/Canvas nodes / Note Claimed | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-claimed | porté | — | lot témoin |
| `blocks-canvas-nodes--note-editing` | Blocks/Canvas nodes / Note Editing | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-editing | porté | — | lot témoin |
| `blocks-canvas-nodes--text` | Blocks/Canvas nodes / Text | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--text | porté | — | lot témoin |
| `blocks-canvas-nodes--shapes` | Blocks/Canvas nodes / Shapes | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--shapes | porté | — | lot témoin |
| `blocks-canvas-nodes--frame` | Blocks/Canvas nodes / Frame | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--frame | porté | — | lot témoin |
| `blocks-canvas-nodes--media-loading` | Blocks/Canvas nodes / Media Loading | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-loading | porté | — | lot témoin |
| `blocks-canvas-nodes--media-loading-labelled` | Blocks/Canvas nodes / Media Loading Labelled | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-loading-labelled | porté | — | lot témoin |
| `blocks-canvas-nodes--media-error` | Blocks/Canvas nodes / Media Error | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-error | porté | — | lot témoin |
| `blocks-canvas-nodes--media-image` | Blocks/Canvas nodes / Media Image | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-image | porté | — | lot témoin |
| `blocks-canvas-nodes--selected-with-anchors` | Blocks/Canvas nodes / Selected With Anchors | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--selected-with-anchors | porté | — | lot témoin |
| `blocks-canvas-pages-panel--flat` | Blocks/Canvas pages panel / Flat | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--flat | porté | — | lot témoin |
| `blocks-canvas-pages-panel--with-folders` | Blocks/Canvas pages panel / With Folders | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-folders | porté | — | lot témoin |
| `blocks-canvas-pages-panel--collapsed` | Blocks/Canvas pages panel / Collapsed | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--collapsed | porté | — | lot témoin |
| `blocks-canvas-pages-panel--single-page` | Blocks/Canvas pages panel / Single Page | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--single-page | porté | — | lot témoin |
| `blocks-canvas-pages-panel--empty` | Blocks/Canvas pages panel / Empty | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--empty | porté | — | lot témoin |
| `blocks-canvas-pages-panel--long-names` | Blocks/Canvas pages panel / Long Names | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--long-names | porté | — | lot témoin |
| `blocks-canvas-pages-panel--drop-indicator-before` | Blocks/Canvas pages panel / Drop Indicator Before | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-before | porté | — | lot témoin |
| `blocks-canvas-pages-panel--drop-indicator-after` | Blocks/Canvas pages panel / Drop Indicator After | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-after | porté | — | lot témoin |
| `blocks-canvas-pages-panel--drop-indicator-into` | Blocks/Canvas pages panel / Drop Indicator Into | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-into | porté | — | lot témoin |
| `blocks-canvas-pages-panel--with-back-link` | Blocks/Canvas pages panel / With Back Link | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-back-link | porté | — | lot témoin |
| `blocks-canvas-pages-panel--rename` | Blocks/Canvas pages panel / Rename | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--rename | porté | — | lot témoin |
| `blocks-canvas-pages-panel--with-authors` | Blocks/Canvas pages panel / With Authors | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-authors | porté | — | lot témoin |
| `blocks-canvas-pages-panel--row-actions` | Blocks/Canvas pages panel / Row Actions | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--row-actions | porté | — | lot témoin |
| `blocks-canvas-pages-panel--delete-always` | Blocks/Canvas pages panel / Delete Always | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always | porté | — | lot témoin |
| `blocks-canvas-pages-panel--delete-always-last-page` | Blocks/Canvas pages panel / Delete Always Last Page | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always-last-page | porté | — | lot témoin |
| `blocks-canvas-pages-panel--delete-always-last-page-label` | Blocks/Canvas pages panel / Delete Always Last Page Label | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always-last-page-label | porté | — | lot témoin |
| `blocks-canvas-pages-panel--spaces-full` | Blocks/Canvas pages panel / Spaces Full | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--spaces-full | porté | — | lot témoin |
| `blocks-canvas-pages-panel--row-action-click` | Blocks/Canvas pages panel / Row Action Click | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--row-action-click | porté | — | lot témoin |
| `blocks-canvas-toolbar--spaces-bottom` | Blocks/Canvas toolbar / Spaces Bottom | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-bottom | porté | — | lot témoin |
| `blocks-canvas-toolbar--spaces-left` | Blocks/Canvas toolbar / Spaces Left | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-left | porté | — | lot témoin |
| `blocks-canvas-toolbar--spaces-right` | Blocks/Canvas toolbar / Spaces Right | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-right | porté | — | lot témoin |
| `blocks-canvas-toolbar--local-canvas` | Blocks/Canvas toolbar / Local Canvas | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--local-canvas | porté | — | lot témoin |
| `blocks-canvas-toolbar--history-unavailable` | Blocks/Canvas toolbar / History Unavailable | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--history-unavailable | porté | — | lot témoin |
| `blocks-canvas-toolbar--disabled` | Blocks/Canvas toolbar / Disabled | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--disabled | porté | — | lot témoin |
| `blocks-canvas-toolbar--tool-armed` | Blocks/Canvas toolbar / Tool Armed | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--tool-armed | porté | — | lot témoin |
| `blocks-presence-cursor--all-hues` | Blocks/Presence cursor / All Hues | stories/components/canvas/presence-cursor.stories.tsx | gallery ?story=blocks-presence-cursor--all-hues | porté | — | lot témoin |
| `blocks-presence-cursor--long-name` | Blocks/Presence cursor / Long Name | stories/components/canvas/presence-cursor.stories.tsx | gallery ?story=blocks-presence-cursor--long-name | porté | — | lot témoin |
| `blocks-comms-composershell--empty` | Blocks/Comms/ComposerShell / Empty | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--empty | porté | — | lot témoin |
| `blocks-comms-composershell--can-send` | Blocks/Comms/ComposerShell / Can Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--can-send | porté | — | lot témoin |
| `blocks-comms-composershell--sending` | Blocks/Comms/ComposerShell / Sending | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--sending | porté | — | lot témoin |
| `blocks-comms-composershell--replying` | Blocks/Comms/ComposerShell / Replying | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--replying | porté | — | lot témoin |
| `blocks-comms-composershell--replying-to-deleted` | Blocks/Comms/ComposerShell / Replying To Deleted | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--replying-to-deleted | porté | — | lot témoin |
| `blocks-comms-composershell--editing` | Blocks/Comms/ComposerShell / Editing | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--editing | porté | — | lot témoin |
| `blocks-comms-composershell--with-attachments` | Blocks/Comms/ComposerShell / With Attachments | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--with-attachments | porté | — | lot témoin |
| `blocks-comms-composershell--read-only` | Blocks/Comms/ComposerShell / Read Only | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--read-only | porté | — | lot témoin |
| `blocks-comms-composershell--custom-send` | Blocks/Comms/ComposerShell / Custom Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--custom-send | porté | — | lot témoin |
| `blocks-comms-composershell--format-row` | Blocks/Comms/ComposerShell / Format Row | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--format-row | porté | — | lot témoin |
| `blocks-comms-composershell--drop-active` | Blocks/Comms/ComposerShell / Drop Active | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--drop-active | porté | — | lot témoin |
| `blocks-comms-composershell--invalid` | Blocks/Comms/ComposerShell / Invalid | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--invalid | porté | — | lot témoin |
| `blocks-comms-composershell--with-popup` | Blocks/Comms/ComposerShell / With Popup | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--with-popup | porté | — | lot témoin |
| `blocks-comms-composershell--editing-with-preview` | Blocks/Comms/ComposerShell / Editing With Preview | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--editing-with-preview | porté | — | lot témoin |
| `blocks-comms-composershell--render-send` | Blocks/Comms/ComposerShell / Render Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--render-send | porté | — | lot témoin |
| `blocks-comms-composershell--custom-send-label` | Blocks/Comms/ComposerShell / Custom Send Label | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--custom-send-label | porté | — | lot témoin |
| `blocks-comms-conversationrow--channel` | Blocks/Comms/ConversationRow / Channel | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--channel | porté | — | lot témoin |
| `blocks-comms-conversationrow--private-channel` | Blocks/Comms/ConversationRow / Private Channel | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--private-channel | porté | — | lot témoin |
| `blocks-comms-conversationrow--selected` | Blocks/Comms/ConversationRow / Selected | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--selected | porté | — | lot témoin |
| `blocks-comms-conversationrow--unread` | Blocks/Comms/ConversationRow / Unread | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--unread | porté | — | lot témoin |
| `blocks-comms-conversationrow--mentions` | Blocks/Comms/ConversationRow / Mentions | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--mentions | porté | — | lot témoin |
| `blocks-comms-conversationrow--many-unread` | Blocks/Comms/ConversationRow / Many Unread | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--many-unread | porté | — | lot témoin |
| `blocks-comms-conversationrow--direct-message-online` | Blocks/Comms/ConversationRow / Direct Message Online | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--direct-message-online | porté | — | lot témoin |
| `blocks-comms-conversationrow--direct-message-offline` | Blocks/Comms/ConversationRow / Direct Message Offline | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--direct-message-offline | porté | — | lot témoin |
| `blocks-comms-conversationrow--group` | Blocks/Comms/ConversationRow / Group | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--group | porté | — | lot témoin |
| `blocks-comms-conversationrow--archived` | Blocks/Comms/ConversationRow / Archived | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--archived | porté | — | lot témoin |
| `blocks-comms-conversationrow--long-name` | Blocks/Comms/ConversationRow / Long Name | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--long-name | porté | — | lot témoin |
| `blocks-comms-conversationrow--list` | Blocks/Comms/ConversationRow / List | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--list | porté | — | lot témoin |
| `blocks-comms-conversationrow--disabled-row` | Blocks/Comms/ConversationRow / Disabled Row | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--disabled-row | porté | — | lot témoin |
| `blocks-comms-messagerow--head` | Blocks/Comms/MessageRow / Head | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--head | porté | — | lot témoin |
| `blocks-comms-messagerow--continuation` | Blocks/Comms/MessageRow / Continuation | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--continuation | porté | — | lot témoin |
| `blocks-comms-messagerow--reply` | Blocks/Comms/MessageRow / Reply | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply | porté | — | lot témoin |
| `blocks-comms-messagerow--reply-to-deleted` | Blocks/Comms/MessageRow / Reply To Deleted | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply-to-deleted | porté | — | lot témoin |
| `blocks-comms-messagerow--reply-missing` | Blocks/Comms/MessageRow / Reply Missing | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply-missing | porté | — | lot témoin |
| `blocks-comms-messagerow--reactions` | Blocks/Comms/MessageRow / Reactions | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reactions | porté | — | lot témoin |
| `blocks-comms-messagerow--pinned` | Blocks/Comms/MessageRow / Pinned | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--pinned | porté | — | lot témoin |
| `blocks-comms-messagerow--edited` | Blocks/Comms/MessageRow / Edited | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--edited | porté | — | lot témoin |
| `blocks-comms-messagerow--sending` | Blocks/Comms/MessageRow / Sending | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--sending | porté | — | lot témoin |
| `blocks-comms-messagerow--failed` | Blocks/Comms/MessageRow / Failed | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--failed | porté | — | lot témoin |
| `blocks-comms-messagerow--deleted` | Blocks/Comms/MessageRow / Deleted | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--deleted | porté | — | lot témoin |
| `blocks-comms-messagerow--integration` | Blocks/Comms/MessageRow / Integration | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--integration | porté | — | lot témoin |
| `blocks-comms-messagerow--integration-via` | Blocks/Comms/MessageRow / Integration Via | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--integration-via | porté | — | lot témoin |
| `blocks-comms-messagerow--editing` | Blocks/Comms/MessageRow / Editing | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--editing | porté | — | lot témoin |
| `blocks-comms-messagerow--with-attachments` | Blocks/Comms/MessageRow / With Attachments | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--with-attachments | porté | — | lot témoin |
| `blocks-comms-messagerow--long-name` | Blocks/Comms/MessageRow / Long Name | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--long-name | porté | — | lot témoin |
| `blocks-comms-messagerow--toolbar-on-focus` | Blocks/Comms/MessageRow / Toolbar On Focus | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--toolbar-on-focus | porté | — | lot témoin |
| `blocks-comms-messagerow--author-name-slot` | Blocks/Comms/MessageRow / Author Name Slot | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--author-name-slot | porté | — | lot témoin |
| `blocks-comms-messagerow--custom-labels` | Blocks/Comms/MessageRow / Custom Labels | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--custom-labels | porté | — | lot témoin |
| `blocks-comms-messagerow--transcript` | Blocks/Comms/MessageRow / Transcript | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--transcript | porté | — | lot témoin |
| `blocks-comms-messagerow--unread-line-label` | Blocks/Comms/MessageRow / Unread Line Label | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--unread-line-label | porté | — | lot témoin |
| `session-sessionpipeline--plan-steps` | Session/SessionPipeline / Plan Steps | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--plan-steps | porté | — | lot témoin |
| `session-sessionpipeline--tool-steps` | Session/SessionPipeline / Tool Steps | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--tool-steps | porté | — | lot témoin |
| `session-sessionpipeline--empty` | Session/SessionPipeline / Empty | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--empty | porté | — | lot témoin |
| `session-sessionpipeline--long-text` | Session/SessionPipeline / Long Text | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--long-text | porté | — | lot témoin |
| `session-sessiontimeline--long` | Session/SessionTimeline / Long | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--long | porté | — | lot témoin |
| `session-sessiontimeline--streaming` | Session/SessionTimeline / Streaming | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--streaming | porté | — | lot témoin |
| `session-sessiontimeline--errored` | Session/SessionTimeline / Errored | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--errored | porté | — | lot témoin |
| `session-sessiontimeline--disconnected` | Session/SessionTimeline / Disconnected | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--disconnected | porté | — | lot témoin |
| `session-sessiontimeline--cancelled` | Session/SessionTimeline / Cancelled | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--cancelled | porté | — | lot témoin |
| `session-sessiontimeline--many-tool-calls` | Session/SessionTimeline / Many Tool Calls | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--many-tool-calls | porté | — | lot témoin |
| `session-sessiontimeline--huge-output` | Session/SessionTimeline / Huge Output | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--huge-output | porté | — | lot témoin |
| `session-sessiontimeline--live-from-the-bottom` | Session/SessionTimeline / Live From The Bottom | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--live-from-the-bottom | porté | — | lot témoin |
| `session-sessiontimeline--web-shaped` | Session/SessionTimeline / Web Shaped | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--web-shaped | porté | — | lot témoin |
| `session-sessiontimeline--without-heading` | Session/SessionTimeline / Without Heading | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--without-heading | porté | — | lot témoin |
| `session-sessiontimeline--agent-mark` | Session/SessionTimeline / Agent Mark | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--agent-mark | porté | — | lot témoin |
| `session-sessiontimeline--author-face` | Session/SessionTimeline / Author Face | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--author-face | porté | — | lot témoin |
| `session-sessiontimeline--phone` | Session/SessionTimeline / Phone | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--phone | porté | — | lot témoin |
| `session-sessiontimeline--deep-link-to-folded-call` | Session/SessionTimeline / Deep Link To Folded Call | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--deep-link-to-folded-call | porté | — | lot témoin |
| `session-sessiontimeline--read-the-rest` | Session/SessionTimeline / Read The Rest | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--read-the-rest | porté | — | lot témoin |
| `session-sessiontimeline--deep-link-then-close` | Session/SessionTimeline / Deep Link Then Close | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--deep-link-then-close | porté | — | lot témoin |
| `session-sessiontimeline--reveal-item` | Session/SessionTimeline / Reveal Item | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--reveal-item | porté | — | lot témoin |
| `session-streamingmarkdown--static` | Session/StreamingMarkdown / Static | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--static | porté | — | lot témoin |
| `session-streamingmarkdown--streaming` | Session/StreamingMarkdown / Streaming | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--streaming | porté | — | lot témoin |
| `session-streamingmarkdown--long` | Session/StreamingMarkdown / Long | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--long | porté | — | lot témoin |
| `session-streamingmarkdown--untrusted-input` | Session/StreamingMarkdown / Untrusted Input | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--untrusted-input | porté | — | lot témoin |
| `session-toolcallcard--default` | Session/ToolCallCard / Default | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--default | porté | — | lot témoin |
| `session-toolcallcard--statuses` | Session/ToolCallCard / Statuses | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--statuses | porté | — | lot témoin |
| `session-toolcallcard--diff` | Session/ToolCallCard / Diff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--diff | porté | — | lot témoin |
| `session-toolcallcard--new-file` | Session/ToolCallCard / New File | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--new-file | porté | — | lot témoin |
| `session-toolcallcard--terminal` | Session/ToolCallCard / Terminal | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--terminal | porté | — | lot témoin |
| `session-toolcallcard--truncated-payload` | Session/ToolCallCard / Truncated Payload | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload | porté | — | lot témoin |
| `session-toolcallcard--truncated-payload-loading` | Session/ToolCallCard / Truncated Payload Loading | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload-loading | porté | — | lot témoin |
| `session-toolcallcard--truncated-payload-states` | Session/ToolCallCard / Truncated Payload States | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload-states | porté | — | lot témoin |
| `session-toolcallcard--binary` | Session/ToolCallCard / Binary | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--binary | porté | — | lot témoin |
| `session-toolcallcard--empty` | Session/ToolCallCard / Empty | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--empty | porté | — | lot témoin |
| `session-toolcallcard--long-title` | Session/ToolCallCard / Long Title | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--long-title | porté | — | lot témoin |
| `session-toolcallcard--huge-output` | Session/ToolCallCard / Huge Output | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--huge-output | porté | — | lot témoin |
| `session-toolcallcard--huge-diff` | Session/ToolCallCard / Huge Diff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--huge-diff | porté | — | lot témoin |
| `session-toolcallcard--default-diff-alone` | Session/ToolCallCard / DefaultDiff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--default-diff-alone | porté | — | lot témoin |
| `session-toolcallcard--copy-payloads` | Session/ToolCallCard / Copy Payloads | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--copy-payloads | porté | — | lot témoin |
| `session-toolcallcard--custom-labels` | Session/ToolCallCard / Custom Labels | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--custom-labels | porté | — | lot témoin |
| `session-turnrow--user-and-answer` | Session/TurnRow / User And Answer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--user-and-answer | porté | — | lot témoin |
| `session-turnrow--streaming` | Session/TurnRow / Streaming | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--streaming | porté | — | lot témoin |
| `session-turnrow--with-attachments` | Session/TurnRow / With Attachments | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-attachments | porté | — | lot témoin |
| `session-turnrow--long-prompt` | Session/TurnRow / Long Prompt | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--long-prompt | porté | — | lot témoin |
| `session-turnrow--clamped-response` | Session/TurnRow / Clamped Response | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--clamped-response | porté | — | lot témoin |
| `session-turnrow--run-file-summary` | Session/TurnRow / Run File Summary | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--run-file-summary | porté | — | lot témoin |
| `session-turnrow--with-thinking` | Session/TurnRow / With Thinking | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-thinking | porté | — | lot témoin |
| `session-turnrow--with-plan` | Session/TurnRow / With Plan | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-plan | porté | — | lot témoin |
| `session-turnrow--with-checkpoint` | Session/TurnRow / With Checkpoint | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-checkpoint | porté | — | lot témoin |
| `session-turnrow--failed` | Session/TurnRow / Failed | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--failed | porté | — | lot témoin |
| `session-turnrow--failed-other` | Session/TurnRow / Failed Other | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--failed-other | porté | — | lot témoin |
| `session-turnrow--cancelled` | Session/TurnRow / Cancelled | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--cancelled | porté | — | lot témoin |
| `session-turnrow--retrying` | Session/TurnRow / Retrying | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--retrying | porté | — | lot témoin |
| `session-turnrow--many-tool-calls` | Session/TurnRow / Many Tool Calls | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--many-tool-calls | porté | — | lot témoin |
| `session-turnrow--item-footer` | Session/TurnRow / Item Footer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--item-footer | porté | — | lot témoin |
| `session-turnrow--checkpoint-footer` | Session/TurnRow / Checkpoint Footer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--checkpoint-footer | porté | — | lot témoin |
| `session-turnrow--controlled-open-tool-call` | Session/TurnRow / Controlled Open Tool Call | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--controlled-open-tool-call | porté | — | lot témoin |
| `session-turnrow--plain-thinking` | Session/TurnRow / Plain Thinking | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--plain-thinking | porté | — | lot témoin |
| `session-turnrow--openable-attachments` | Session/TurnRow / Openable Attachments | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--openable-attachments | porté | — | lot témoin |
| `session-turnrow--read-the-rest` | Session/TurnRow / Read The Rest | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest | porté | — | lot témoin |
| `session-turnrow--read-the-rest-failed` | Session/TurnRow / Read The Rest Failed | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest-failed | porté | — | lot témoin |
| `session-turnrow--read-the-rest-states` | Session/TurnRow / Read The Rest States | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest-states | porté | — | lot témoin |
| `session-turnrow--controlled-tool-run` | Session/TurnRow / Controlled Tool Run | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--controlled-tool-run | porté | — | lot témoin |
| `shell-appshell--default` | Shell/AppShell / Default | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--default | porté | — | lot témoin |
| `shell-appshell--with-dock` | Shell/AppShell / With Dock | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--with-dock | porté | — | lot témoin |
| `shell-appshell--collapsed` | Shell/AppShell / Collapsed | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--collapsed | porté | — | lot témoin |
| `shell-appshell--light` | Shell/AppShell / Light | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--light | porté | — | lot témoin |
| `shell-appshell--empty` | Shell/AppShell / Empty | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--empty | porté | — | lot témoin |
| `shell-appshell--many-items` | Shell/AppShell / Many Items | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--many-items | porté | — | lot témoin |
| `shell-appshell--command-open` | Shell/AppShell / Command Open | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--command-open | porté | — | lot témoin |
| `shell-appshell--phone` | Shell/AppShell / Phone | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--phone | porté | — | lot témoin |
| `shell-authsplit--default` | Shell/AuthSplit / Default | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--default | porté | — | lot témoin |
| `shell-authsplit--loading` | Shell/AuthSplit / Loading | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--loading | porté | — | lot témoin |
| `shell-authsplit--error-state` | Shell/AuthSplit / Error | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--error-state | porté | — | lot témoin |
| `shell-authsplit--without-proof` | Shell/AuthSplit / Without Proof | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--without-proof | porté | — | lot témoin |
| `shell-authsplit--long-text` | Shell/AuthSplit / Long Text | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--long-text | porté | — | lot témoin |
| `shell-commandmenu--default` | Shell/CommandMenu / Default | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--default | porté | — | lot témoin |
| `shell-commandmenu--open` | Shell/CommandMenu / Open | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--open | porté | — | lot témoin |
| `shell-commandmenu--filtered` | Shell/CommandMenu / Filtered | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--filtered | porté | — | lot témoin |
| `shell-commandmenu--empty` | Shell/CommandMenu / Empty | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--empty | porté | — | lot témoin |
| `shell-commandmenu--many-items` | Shell/CommandMenu / Many Items | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--many-items | porté | — | lot témoin |
| `shell-commandmenu--long-text` | Shell/CommandMenu / Long Text | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--long-text | porté | — | lot témoin |
| `shell-listdetail--default` | Shell/ListDetail / Default | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--default | porté | — | lot témoin |
| `shell-listdetail--wide` | Shell/ListDetail / Wide | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--wide | porté | — | lot témoin |
| `shell-listdetail--empty` | Shell/ListDetail / Empty | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--empty | porté | — | lot témoin |
| `shell-listdetail--long-text` | Shell/ListDetail / Long Text | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--long-text | porté | — | lot témoin |
| `shell-listdetail--many-items` | Shell/ListDetail / Many Items | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--many-items | porté | — | lot témoin |
| `shell-orgswitcher--default` | Shell/OrgSwitcher / Default | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--default | porté | — | lot témoin |
| `shell-orgswitcher--open` | Shell/OrgSwitcher / Open | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--open | porté | — | lot témoin |
| `shell-orgswitcher--switch-workspace` | Shell/OrgSwitcher / Switch Workspace | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--switch-workspace | porté | — | lot témoin |
| `shell-orgswitcher--collapsed` | Shell/OrgSwitcher / Collapsed | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--collapsed | porté | — | lot témoin |
| `shell-orgswitcher--long-text` | Shell/OrgSwitcher / Long Text | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--long-text | porté | — | lot témoin |
| `shell-orgswitcher--many-items` | Shell/OrgSwitcher / Many Items | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--many-items | porté | — | lot témoin |
| `shell-orgswitcher--mark` | Shell/OrgSwitcher / Mark | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--mark | porté | — | lot témoin |
| `shell-settingsshell--default` | Shell/SettingsShell / Default | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--default | porté | — | lot témoin |
| `shell-settingsshell--empty` | Shell/SettingsShell / Empty | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--empty | porté | — | lot témoin |
| `shell-settingsshell--long-text` | Shell/SettingsShell / Long Text | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--long-text | porté | — | lot témoin |
| `shell-settingsshell--many-items` | Shell/SettingsShell / Many Items | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--many-items | porté | — | lot témoin |
| `shell-settingsshell--rail` | Shell/SettingsShell / Rail | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--rail | porté | — | lot témoin |
| `shell-sidebarcontrols--default` | Shell/SidebarControls / Default | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--default | porté | — | lot témoin |
| `shell-sidebarcontrols--profile-open` | Shell/SidebarControls / Profile Open | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--profile-open | porté | — | lot témoin |
| `shell-sidebarcontrols--info-open` | Shell/SidebarControls / Info Open | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--info-open | porté | — | lot témoin |
| `shell-sidebarcontrols--info-few-links` | Shell/SidebarControls / Info Few Links | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--info-few-links | porté | — | lot témoin |
| `shell-sidebarcontrols--long-text` | Shell/SidebarControls / Long Text | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--long-text | porté | — | lot témoin |
| `shell-sidebar--default` | Shell/Sidebar / Default | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--default | porté | — | lot témoin |
| `shell-sidebar--collapsed` | Shell/Sidebar / Collapsed | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--collapsed | porté | — | lot témoin |
| `shell-sidebar--child-active` | Shell/Sidebar / Child Active | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--child-active | porté | — | lot témoin |
| `shell-sidebar--empty` | Shell/Sidebar / Empty | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--empty | porté | — | lot témoin |
| `shell-sidebar--long-text` | Shell/Sidebar / Long Text | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--long-text | porté | — | lot témoin |
| `shell-sidebar--many-items` | Shell/Sidebar / Many Items | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--many-items | porté | — | lot témoin |
| `shell-uiscale--default` | Shell/UiScale / Default | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--default | porté | — | lot témoin |
| `shell-uiscale--open` | Shell/UiScale / Open | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--open | porté | — | lot témoin |
| `shell-uiscale--icon-only` | Shell/UiScale / Icon Only | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--icon-only | porté | — | lot témoin |
| `shell-uiscale--at-minimum` | Shell/UiScale / At Minimum | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--at-minimum | porté | — | lot témoin |
| `shell-uiscale--panel` | Shell/UiScale / Panel | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--panel | porté | — | lot témoin |
| `shell-uiscale--with-shortcuts` | Shell/UiScale / With Shortcuts | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--with-shortcuts | porté | — | lot témoin |
| `layout-appframe--default` | Layout/AppFrame / Default | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--default | porté | — | lot témoin |
| `layout-appframe--with-dock` | Layout/AppFrame / With Dock | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--with-dock | porté | — | lot témoin |
| `layout-appframe--half-dock` | Layout/AppFrame / Half Dock | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--half-dock | porté | — | lot témoin |
| `layout-appframe--empty` | Layout/AppFrame / Empty | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--empty | porté | — | lot témoin |
| `layout-appframe--light` | Layout/AppFrame / Light | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--light | porté | — | lot témoin |
| `layout-appframe--titlebar-inset` | Layout/AppFrame / Titlebar Inset | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--titlebar-inset | porté | — | lot témoin |
| `layout-appframe--phone` | Layout/AppFrame / Phone | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--phone | porté | — | lot témoin |
| `layout-resizablesplit--horizontal` | Layout/ResizableSplit / Horizontal | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--horizontal | porté | — | lot témoin |
| `layout-resizablesplit--vertical` | Layout/ResizableSplit / Vertical | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--vertical | porté | — | lot témoin |
| `layout-resizablesplit--many-panes` | Layout/ResizableSplit / Many Panes | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--many-panes | porté | — | lot témoin |
| `layout-resizablesplit--collapsed-pane` | Layout/ResizableSplit / Collapsed Pane | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--collapsed-pane | porté | — | lot témoin |
| `layout-resizablesplit--nested` | Layout/ResizableSplit / Nested | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--nested | porté | — | lot témoin |
| `layout-resizablesplit--light` | Layout/ResizableSplit / Light | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--light | porté | — | lot témoin |
| `layout-tabstrip--default` | Layout/TabStrip / Default | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--default | porté | 1/1 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--states` | Layout/TabStrip / States | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--states | porté | — | lot témoin |
| `layout-tabstrip--unfocused` | Layout/TabStrip / Unfocused | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--unfocused | porté | — | lot témoin |
| `layout-tabstrip--none-active` | Layout/TabStrip / None Active | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--none-active | porté | — | lot témoin |
| `layout-tabstrip--overflow` | Layout/TabStrip / Overflow | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--overflow | porté | — | lot témoin |
| `layout-tabstrip--context-menu-on-tabs` | Layout/TabStrip / Context Menu On Tabs | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--context-menu-on-tabs | porté | — | lot témoin |
| `layout-tabstrip--empty` | Layout/TabStrip / Empty | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--empty | porté | — | lot témoin |
| `layout-tabstrip--behaviour-opt-outs` | Layout/TabStrip / Behaviour Opt Outs | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--behaviour-opt-outs | porté | — | lot témoin |
| `layout-tabstrip--drag-to-reorder` | Layout/TabStrip / Drag To Reorder | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--drag-to-reorder | porté | — | lot témoin |
| `layout-tabstrip--light` | Layout/TabStrip / Light | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--light | porté | — | lot témoin |

## Fondations et ressources

| Type | Chemin | Statut | Note |
|---|---|---|---|
| css | `src/styles/styles.css` | vérifié | copié du SHA ; importé par la galerie et le consommateur |
| css | `src/styles/styles-core.css` | vérifié | copié du SHA |
| css | `src/styles/themes.css` | vérifié | généré : `bun run theme:check` passe sur les 15 thèmes |
| tokens | `keys.toml` | vérifié | source unique, réutilisée sans modification |
| themes | `themes/*.toml` | vérifié | 15 thèmes, résolution testée sur les 30 combinaisons |
| theme-engine | `src/theme/*.ts` | vérifié | copié du SHA ; tests de résolution importés |
| notices | `THIRD_PARTY_NOTICES.md` | vérifié | copié du SHA, distribué dans le tarball |
| license | `LICENSE` | vérifié | Apache-2.0, copié du SHA |
