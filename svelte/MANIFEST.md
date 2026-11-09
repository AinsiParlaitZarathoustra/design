# Manifeste de migration — @tryatlas/design 0.1.15 → @tryatlas/design-svelte

Généré le 2026-11-09T02:04:32.440Z depuis `/Users/maximebuffet/Documents/design` au SHA `0f4399832d06bc3558d35d5a96d6557f33d412b1`.

## Couverture

| Contrat | Total | Portés | Vérifiés | Exclus | Non portés |
|---|---:|---:|---:|---:|---:|
| Exports publics | 758 | 753 | 22 | 5 | 0 |
| Stories | 853 | 853 | 768 | 0 | 0 |

## Exports (racine, variantes, thème, session, blocs, animations, ratchet)

| Export | Entrées | Source | Svelte | Statut | Stories | Tests |
|---|---|---|---|---|---|---|
| `Accordion` | . | src/index.ts | ./accordion.svelte | porté | 6 | — |
| `AccordionContent` | . | src/index.ts | ./accordion-content.svelte | porté | 6 | — |
| `AccordionItem` | . | src/index.ts | ./accordion-item.svelte | porté | 6 | — |
| `AccordionTrigger` | . | src/index.ts | ./accordion-trigger.svelte | porté | 6 | — |
| `activateHintTarget` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `ACTOR_COLOUR_HUE` | . | src/index.ts | ./lib/actor-hue | porté | 0 | — |
| `actorHue` | . | src/index.ts | ./lib/actor-hue | porté | 0 | — |
| `agentFamily` | . | src/index.ts | ./model-family | porté | 7 | — |
| `AgentItem` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
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
| `Appearance` | ., ./theme, ./blocks | src/index.ts | ./lots/exports-20261108/use-theme.svelte | porté | 0 | — |
| `AppFrame` | . | src/index.ts | ./layout/app-frame.svelte | porté | 7 | — |
| `AppFrameInset` | . | src/index.ts | ./layout/app-frame | porté | 0 | — |
| `AppShell` | . | src/index.ts | ./shell/app-shell.svelte | porté | 8 | — |
| `ATLAS_PREFIX_RULE` | ./ratchet | src/ratchet/index.ts | ./rules.ts | porté | 0 | — |
| `AtlasBadge` | . | src/index.ts | ./atlas-badge.svelte | porté | 7 | — |
| `AtlasBadgeTone` | . | src/index.ts | ./atlas-badge.svelte | porté | 0 | — |
| `AtlasMark` | . | src/index.ts | ./atlas-mark.svelte | porté | 26 | — |
| `AtlasWordmark` | . | src/index.ts | ./atlas-wordmark.svelte | porté | 7 | — |
| `AttachmentView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
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
| `BadgeProps` | ., ./variants | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `badgeVariants` | ., ./variants | src/index.ts | src/ui/badge-variants.ts | porté | 0 | — |
| `BASE_RULE_REGISTRY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 1 | — |
| `BaseRule` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `BellGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `BlockSplit` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `BlurEdge` | ., ./blocks | src/index.ts | ./blocks/gradual-blur.svelte | porté | 0 | — |
| `BodyLoad` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `BrandMarkProps` | . | src/index.ts | ./deps/brand-mark-svg.svelte | porté | 0 | — |
| `Breadcrumb` | . | src/index.ts | ./breadcrumb.svelte | porté | 5 | — |
| `BreadcrumbEllipsis` | . | src/index.ts | ./breadcrumb-ellipsis.svelte | porté | 5 | — |
| `BreadcrumbItem` | . | src/index.ts | ./breadcrumb-item.svelte | porté | 5 | — |
| `BreadcrumbLink` | . | src/index.ts | ./breadcrumb-link.svelte | porté | 5 | — |
| `BreadcrumbList` | . | src/index.ts | ./breadcrumb-list.svelte | porté | 5 | — |
| `BreadcrumbPage` | . | src/index.ts | ./breadcrumb-page.svelte | porté | 5 | — |
| `BreadcrumbSeparator` | . | src/index.ts | ./breadcrumb-separator.svelte | porté | 5 | — |
| `Button` | . | src/index.ts | src/ui/button.svelte | vérifié | 267 | tests/primitives.test.ts |
| `ButtonProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `buttonVariants` | ., ./variants | src/index.ts | src/ui/button-variants.ts | vérifié | 0 | tests/primitives.test.ts |
| `CalendarDay` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ../lots/f8-blocks-foundations/blocks/timeline-calendar.svelte | porté | 0 | — |
| `CalendarItem` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ../lots/f8-blocks-foundations/blocks/timeline-calendar.svelte | porté | 8 | — |
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
| `CheckpointTrace` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte | porté | 19 | — |
| `CheckpointTraceProps` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte | porté | 19 | — |
| `CheckpointView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `clampUiScale` | . | src/index.ts | ./lots/f5-layout-shell/shell/ui-scale | porté | 0 | — |
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
| `CommandHints` | . | src/index.ts | ./lots/f2-overlays-menus/command-hints.svelte | porté | 15 | — |
| `CommandInput` | . | src/index.ts | ./command-input.svelte | porté | 6 | — |
| `CommandItem` | . | src/index.ts | ./command-item.svelte | porté | 6 | — |
| `CommandItemIcon` | . | src/index.ts | ./command-item-icon.svelte | porté | 6 | — |
| `CommandList` | . | src/index.ts | ./lots/f2-overlays-menus/command-list-rows.svelte | porté | 15 | — |
| `CommandMenu` | . | src/index.ts | ./command-menu.svelte | porté | 6 | — |
| `CommandPalette` | . | src/index.ts | ./lots/f2-overlays-menus/command-palette.svelte | porté | 15 | — |
| `CommandPaletteGroup` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 15 | — |
| `CommandPaletteItem` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 15 | — |
| `CommandPaletteProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommandPaletteView` | . | src/index.ts | ./lots/f2-overlays-menus/command-palette-view.svelte | porté | 15 | — |
| `CommandPaletteViewProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommandPanel` | . | src/index.ts | ./command-panel.svelte | porté | 31 | — |
| `CommandRow` | . | src/index.ts | ./lots/f2-overlays-menus/command-row.svelte | porté | 15 | — |
| `CommandShortcut` | . | src/index.ts | ./command-shortcut.svelte | porté | 6 | — |
| `CommandSize` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommandSubmenuChevron` | . | src/index.ts | ./command-submenu-chevron.svelte | porté | 6 | — |
| `CommandSuggestion` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 1 | — |
| `commandSuggestionId` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 0 | — |
| `CommandSuggestions` | . | src/index.ts | ./code-surface/command-suggestions.svelte | porté | 1 | — |
| `CommandSuggestionsProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommentAnchor` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `CommentView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `COMMS_GROUP_WINDOW_MS` | . | src/index.ts | ./lots/f7-session-comms/comms/comms-view-helpers | porté | 0 | — |
| `CommsAuthor` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsCallMarker` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsComposerSendState` | . | src/index.ts | ./comms/comms-composer-shell.svelte | porté | 0 | — |
| `CommsComposerShell` | . | src/index.ts | ./comms/comms-composer-shell.svelte | porté | 16 | — |
| `CommsComposerShellProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommsConversationKind` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsConversationRow` | . | src/index.ts | ./comms/comms-conversation-row.svelte | porté | 13 | — |
| `CommsConversationRowProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommsConversationRowView` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsConversationSelect` | . | src/index.ts | ./comms/comms-conversation-row.svelte | porté | 0 | — |
| `CommsDayDivider` | . | src/index.ts | ./comms/comms-day-divider.svelte | porté | 21 | — |
| `CommsDayDividerProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CommsMessageRow` | . | src/index.ts | ./comms/comms-message-row.svelte | porté | 21 | — |
| `CommsMessageRowLabels` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `CommsMessageRowPermissions` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `CommsMessageRowProps` | . | src/index.ts | ./comms/comms-message-row.svelte | porté | 0 | — |
| `CommsMessageView` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsReaction` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsReplyRef` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsSendState` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsTranscriptRow` | . | src/index.ts | src/lots/f7-session-comms/comms/comms-view.ts | porté | 0 | — |
| `CommsUnreadBadge` | . | src/index.ts | ./lots/f7-session-comms/comms/comms-view-helpers | porté | 0 | — |
| `CommsUnreadLine` | . | src/index.ts | ./comms/comms-unread-line.svelte | porté | 21 | — |
| `CommsUnreadLineProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `CompoundFilter` | . | src/index.ts | ./compound-filter.svelte | porté | 5 | — |
| `ContextMenu` | . | src/index.ts | ./context-menu.svelte | porté | 14 | — |
| `ContextMenuCheckboxItem` | . | src/index.ts | ./context-menu-checkbox-item.svelte | porté | 4 | — |
| `ContextMenuContent` | . | src/index.ts | ./context-menu-content.svelte | porté | 14 | — |
| `ContextMenuGroup` | . | src/index.ts | ./dropdown-menu-group.svelte | porté | 4 | — |
| `ContextMenuItem` | . | src/index.ts | ./context-menu-item.svelte | porté | 14 | — |
| `ContextMenuLabel` | . | src/index.ts | ./dropdown-menu-label.svelte | porté | 4 | — |
| `ContextMenuPortal` | . | src/index.ts | — | exclu | 0 | — |
| `ContextMenuRadioGroup` | . | src/index.ts | ./lots/f2-overlays-menus/dropdown-menu-radio-group.svelte | porté | 0 | — |
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
| `D23_RENAMES` | . | src/index.ts | ./lib/d23-renames | porté | 0 | — |
| `D23Rename` | . | src/index.ts | ./lib/d23-renames | porté | 0 | — |
| `DashedRails` | ., ./blocks | src/index.ts | ./blocks/dashed-rails.svelte | porté | 3 | — |
| `DataTable` | . | src/index.ts | ./data-table.svelte | porté | 7 | — |
| `DataTableSort` | . | src/index.ts | ./data-table-types | porté | 7 | — |
| `DeepInfraMark` | . | src/index.ts | ./provider-marks/deep-infra-mark.svelte | porté | 3 | — |
| `DeepSeekMark` | . | src/index.ts | ./provider-marks/deep-seek-mark.svelte | porté | 3 | — |
| `DEFAULT_COMMS_MESSAGE_ROW_LABELS` | . | src/index.ts | ./comms/comms-message-labels | porté | 0 | — |
| `DEFAULT_TOOL_CALL_CARD_LABELS` | ./session | src/session.ts | ./lots/f7-session-comms/session/tool-call-labels | porté | 0 | — |
| `DEFAULT_TRACE_LABELS` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte | porté | 0 | — |
| `DefaultDiff` | ./session | src/session.ts | ./lots/f7-session-comms/session/default-diff.svelte | porté | 16 | — |
| `DefaultDiffProps` | ./session | src/session.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `defineRatchetSuite` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `DeltaChip` | . | src/index.ts | ./delta-chip.svelte | porté | 8 | — |
| `DeltaTone` | . | src/index.ts | ./delta-chip.svelte | porté | 0 | — |
| `DerivationContext` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DERIVED_VAR_REGISTRY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DerivedVar` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DerivedVarDefinition` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `describeDerivation` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `DetailPane` | . | src/index.ts | ./shell/detail-pane.svelte | porté | 5 | — |
| `detectKeyPlatform` | . | src/index.ts | ./lib/combo | porté | 0 | — |
| `Dialog` | . | src/index.ts | src/ui/dialog/dialog.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogClose` | . | src/index.ts | src/ui/dialog/dialog-close.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogContent` | . | src/index.ts | src/ui/dialog/dialog-content.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogContentSize` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `DialogContentVariant` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `DialogDescription` | . | src/index.ts | src/ui/dialog/dialog-description.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogFooter` | . | src/index.ts | src/ui/dialog/dialog-footer.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogHeader` | . | src/index.ts | src/ui/dialog/dialog-header.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogOverlay` | . | src/index.ts | ./ui/dialog/index | porté | 0 | — |
| `DialogPortal` | . | src/index.ts | — | exclu | 0 | — |
| `DialogTitle` | . | src/index.ts | src/ui/dialog/dialog-title.svelte | vérifié | 7 | tests/dialog.test.ts |
| `DialogTrigger` | . | src/index.ts | src/ui/dialog/dialog-trigger.svelte | vérifié | 13 | tests/dialog.test.ts |
| `DiffData` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
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
| `DropdownMenuPortal` | . | src/index.ts | — | exclu | 0 | — |
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
| `EditorBreadcrumbsProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `EditorFrame` | . | src/index.ts | ./code-surface/editor-frame.svelte | porté | 8 | — |
| `EditorFrameProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `EditorPreview` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 11 | — |
| `EditorPreviewLine` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 0 | — |
| `EditorPreviewProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `EditorPreviewToken` | . | src/index.ts | ./code-surface/editor-preview.svelte | porté | 0 | — |
| `EditorStatusBar` | . | src/index.ts | ./code-surface/editor-status-bar.svelte | porté | 11 | — |
| `EditorStatusBarProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `ElevenLabsMark` | . | src/index.ts | ./provider-marks/eleven-labs-mark.svelte | porté | 3 | — |
| `EMPTY_SPLIT` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `EmptyState` | . | src/index.ts | ./empty-state.svelte | porté | 6 | — |
| `ErrorKind` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
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
| `filterCommandGroups` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 15 | — |
| `FindBar` | . | src/index.ts | ./code-surface/find-bar.svelte | porté | 14 | — |
| `FindBarProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 6 | — |
| `FindFlag` | . | src/index.ts | ./code-surface/find-bar.svelte | porté | 0 | — |
| `FireworksMark` | . | src/index.ts | ./provider-marks/fireworks-mark.svelte | porté | 3 | — |
| `formatBytes` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `formatClock` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `formatDayLabel` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `formatDiffCount` | . | src/index.ts | ./format-diff-count | porté | 0 | — |
| `formatDuration` | ., ./session | src/index.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `formatViolations` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `GeminiMark` | . | src/index.ts | ./gemini-mark.svelte | porté | 17 | — |
| `generateHintLabels` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `GhostCards` | ., ./blocks | src/index.ts | ./blocks/ghost-cards.svelte | porté | 2 | — |
| `GitHubMark` | . | src/index.ts | ./github-mark.svelte | porté | 17 | — |
| `Globe` | ., ./blocks | src/index.ts | ./blocks/globe.svelte | porté | 21 | — |
| `GlobeMarker` | ., ./blocks | src/index.ts | ./blocks/globe.svelte | porté | 6 | — |
| `GoChevron` | . | src/index.ts | ./go-chevron.svelte | porté | 4 | — |
| `GoogleMark` | . | src/index.ts | ./google-mark.svelte | porté | 16 | — |
| `GradualBlur` | ., ./blocks | src/index.ts | ./blocks/gradual-blur.svelte | porté | 4 | — |
| `GradualBlurProps` | ., ./blocks | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `GroqMark` | . | src/index.ts | ./provider-marks/groq-mark.svelte | porté | 3 | — |
| `hasReferenceDefinitions` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `hexOf` | ./theme | src/theme/index.ts | ./values | porté | 0 | — |
| `highlightRanges` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 24 | — |
| `HighlightSegment` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 0 | — |
| `Hint` | . | src/index.ts | src/ui/hint.svelte | porté | 28 | — |
| `HINT_ALPHABET` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `HINT_OVERLAY_ATTR` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `HINT_SELECTOR` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `HintGroup` | . | src/index.ts | ./hint-group | porté | 3 | — |
| `HintItem` | . | src/index.ts | ./hint-group | porté | 3 | — |
| `HintOverlay` | . | src/index.ts | ./lots/f2-overlays-menus/hint-overlay.svelte | porté | 4 | — |
| `HintOverlayProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `HintTarget` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `hintTriggerProps` | . | src/index.ts | ./lots/exports-20261108/hint-trigger-props | porté | 0 | — |
| `hrefOf` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `HsvColor` | ./theme | src/theme/index.ts | ./color | porté | 4 | — |
| `hsvToHex` | ./theme | src/theme/index.ts | ./color | porté | 4 | — |
| `HUD` | . | src/index.ts | ./deps/hud | porté | 1 | — |
| `HUE_BG` | . | src/index.ts | ./lib/hue | porté | 0 | — |
| `HUE_CHIP` | . | src/index.ts | ./lib/hue | porté | 0 | — |
| `HueDot` | . | src/index.ts | ./hue-dot.svelte | porté | 8 | — |
| `hueFor` | . | src/index.ts | ./lib/hue | porté | 0 | — |
| `HUES` | . | src/index.ts | ../../lib/hue | porté | 17 | — |
| `HuggingFaceMark` | . | src/index.ts | ./provider-marks/hugging-face-mark.svelte | porté | 3 | — |
| `Icon` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 206 | tests/primitives.test.ts |
| `ICON_SIZES` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 8 | tests/primitives.test.ts |
| `ICON_STROKE_WIDTH` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 1 | tests/primitives.test.ts |
| `IconButton` | . | src/index.ts | src/ui/icon-button.svelte | vérifié | 119 | tests/primitives.test.ts |
| `IconButtonProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `iconButtonVariants` | ., ./variants | src/index.ts | src/ui/icon-button-variants.ts | porté | 0 | — |
| `IconProps` | ., ./variants | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `IconSize` | ., ./variants | src/index.ts | src/ui/icon.svelte | porté | 8 | — |
| `INFINITE_ANIMATION_FPS_VAR` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 5 | — |
| `INFINITE_ANIMATIONS` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 1 | — |
| `InfiniteAnimation` | ., ./animations | src/index.ts | ../../lib/infinite-animations | porté | 0 | — |
| `infiniteAnimationFps` | ., ./animations | src/index.ts | ./lib/infinite-animations | porté | 0 | — |
| `InfiniteSlider` | ., ./blocks | src/index.ts | ./blocks/infinite-slider.svelte | porté | 5 | — |
| `InfiniteSliderProps` | ., ./blocks | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `InfoLinks` | . | src/index.ts | ./shell/info-menu.svelte | porté | 5 | — |
| `InfoMenu` | . | src/index.ts | ./shell/info-menu.svelte | porté | 19 | — |
| `initialsOf` | . | src/index.ts | ./lib/initials | porté | 0 | — |
| `Input` | . | src/index.ts | src/ui/input.svelte | vérifié | 42 | tests/input.test.ts |
| `InputGroup` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupAddon` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupButton` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupInput` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupText` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputGroupTextarea` | . | src/index.ts | ./input-group | porté | 9 | — |
| `InputProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `inputVariants` | ., ./variants | src/index.ts | src/ui/input-variants.ts | vérifié | 0 | tests/input.test.ts |
| `isAt` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `isFocusVisible` | . | src/index.ts | ./lots/f2-overlays-menus/tooltip-context | porté | 0 | — |
| `isIncompleteCodeFence` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `isTooltipWarm` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `JetBrainsMark` | . | src/index.ts | ./jetbrains-mark.svelte | porté | 8 | — |
| `JinaMark` | . | src/index.ts | ./provider-marks/jina-mark.svelte | porté | 3 | — |
| `Kbd` | . | src/index.ts | src/ui/kbd.svelte | vérifié | 63 | tests/primitives.test.ts |
| `KbdCombo` | . | src/index.ts | src/ui/kbd-combo.svelte | vérifié | 6 | tests/primitives.test.ts |
| `KbdGroup` | . | src/index.ts | ./lots/f2-overlays-menus/deps/kbd-group.svelte | porté | 0 | — |
| `KbdKeys` | . | src/index.ts | src/ui/kbd-keys.svelte | porté | 6 | — |
| `KbdKeysProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `KbdProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `kbdVariants` | ., ./variants | src/index.ts | src/ui/kbd-variants.ts | porté | 0 | — |
| `KeyPlatform` | . | src/index.ts | ./lib/combo | porté | 0 | — |
| `KiloMark` | . | src/index.ts | ./kilo-mark.svelte | porté | 8 | — |
| `KimiMark` | . | src/index.ts | ./provider-marks/kimi-mark.svelte | porté | 3 | — |
| `KpiCell` | . | src/index.ts | ./kpi-strip.svelte | porté | 8 | — |
| `KpiStrip` | . | src/index.ts | ./kpi-strip.svelte | porté | 8 | — |
| `Label` | . | src/index.ts | ./label.svelte | porté | 17 | — |
| `LabelMark` | . | src/index.ts | ./label-mark.svelte | porté | 8 | — |
| `LabelTone` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `lighten` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `LinkComponent` | . | src/index.ts | ./lots/f5-layout-shell/deps/link | porté | 0 | — |
| `LinkLocation` | . | src/index.ts | ./deps/link | porté | 0 | — |
| `LinkProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `LinkProvider` | . | src/index.ts | ./lots/exports-20261108/link-provider.svelte | porté | 0 | — |
| `linkVariants` | ., ./variants | src/index.ts | ./lots/f4-ui-second-half-patterns/text-link-variants | porté | 0 | — |
| `ListDetail` | . | src/index.ts | ./shell/list-detail.svelte | porté | 5 | — |
| `ListPane` | . | src/index.ts | ./shell/list-pane.svelte | porté | 5 | — |
| `LOCAL_CANVAS_TOOL_GROUPS` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 11 | — |
| `Logo` | ., ./blocks | src/index.ts | ./blocks/logo-marquee.svelte | porté | 4 | — |
| `LogoMarquee` | ., ./blocks | src/index.ts | ./blocks/logo-marquee.svelte | porté | 9 | — |
| `MailboxIcon` | . | src/index.ts | ./mailbox-icon.svelte | porté | 3 | — |
| `MailboxIconHandle` | . | src/index.ts | ./mailbox-icon.svelte | porté | 3 | — |
| `markTooltipClosed` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `markTooltipOpen` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
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
| `ModelMark` | . | src/index.ts | ./lots/f4-ui-second-half-patterns/model-mark.svelte | porté | 24 | — |
| `monogramTextClass` | . | src/index.ts | ./agent-icon | porté | 0 | — |
| `NextPage` | . | src/index.ts | ./next-page.svelte | porté | 4 | — |
| `NextPageProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `normalizeSearchText` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 0 | — |
| `OpenAIMark` | . | src/index.ts | ./openai-mark.svelte | porté | 20 | — |
| `OpenCodeMark` | . | src/index.ts | ./opencode-mark.svelte | porté | 8 | — |
| `OpenRouterMark` | . | src/index.ts | ./provider-marks/open-router-mark.svelte | porté | 3 | — |
| `optionId` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 25 | — |
| `Organisation` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `OrgMark` | . | src/index.ts | ./shell/org-mark.svelte | porté | 7 | — |
| `OrgSwitcher` | . | src/index.ts | ./shell/org-switcher.svelte | porté | 21 | — |
| `PACKAGE_SENTINEL_CLASS` | . | src/index.ts | ./lib/sentinel | porté | 0 | — |
| `PageHeader` | . | src/index.ts | ./deps/page-header.svelte | porté | 26 | — |
| `PALETTE_KEYS` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `PaletteKey` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `Panel` | . | src/index.ts | ./panel.svelte | porté | 6 | — |
| `PANEL_ENTER` | . | src/index.ts | ./lib/motion | porté | 0 | — |
| `PANEL_STAGGER` | . | src/index.ts | ./lib/motion | porté | 0 | — |
| `parseColor` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `pathSegments` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 11 | — |
| `Payload` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `PEER_INK` | . | src/index.ts | ./lib/actor-hue | porté | 0 | — |
| `PerplexityMark` | . | src/index.ts | ./provider-marks/perplexity-mark.svelte | porté | 3 | — |
| `PersonAvatar` | . | src/index.ts | ./person-avatar.svelte | porté | 19 | — |
| `PersonRef` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `Pill` | . | src/index.ts | ./pill.svelte | porté | 10 | — |
| `PillProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `PillSize` | . | src/index.ts | ./pill.svelte | porté | 0 | — |
| `PillSurface` | . | src/index.ts | ./pill.svelte | porté | 0 | — |
| `PlanItem` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `platformKey` | . | src/index.ts | ./lib/combo | porté | 0 | — |
| `platformKeys` | . | src/index.ts | ./lib/combo | porté | 0 | — |
| `PlusCorners` | ., ./blocks | src/index.ts | ./blocks/plus-corners.svelte | porté | 2 | — |
| `PlusDecorator` | ., ./blocks | src/index.ts | ./blocks/plus-decorator.svelte | porté | 2 | — |
| `PlusMinusGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `Popover` | . | src/index.ts | ./popover.svelte | porté | 7 | — |
| `PopoverClose` | . | src/index.ts | ./lots/exports-20261108/popover-close.svelte | porté | 0 | — |
| `PopoverContent` | . | src/index.ts | ./popover-content.svelte | porté | 7 | — |
| `PopoverDescription` | . | src/index.ts | ./popover-description.svelte | porté | 7 | — |
| `PopoverHeader` | . | src/index.ts | ./popover-header.svelte | porté | 7 | — |
| `PopoverPortal` | . | src/index.ts | — | exclu | 0 | — |
| `PopoverTitle` | . | src/index.ts | ./popover-title.svelte | porté | 7 | — |
| `PopoverTrigger` | . | src/index.ts | ./popover-trigger.svelte | porté | 7 | — |
| `prefersReducedMotion` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
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
| `RailProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `RatchetOptions` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `RatchetRule` | ./ratchet | src/ratchet/index.ts | ./rules.ts | porté | 0 | — |
| `RatchetSuiteConfig` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `RatchetSuiteRunner` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `RatchetViolation` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `reactionChips` | . | src/index.ts | ./comms/comms-view-helpers | porté | 0 | — |
| `readable` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `ReplicateMark` | . | src/index.ts | ./provider-marks/replicate-mark.svelte | porté | 3 | — |
| `resetTooltipTiming` | . | src/index.ts | ./ui/tooltip-timing | porté | 7 | — |
| `ResizableHandle` | . | src/index.ts | ./layout/resizable-handle.svelte | porté | 6 | — |
| `ResizableLayout` | . | src/index.ts | ./layout/resizable.svelte | porté | 0 | — |
| `ResizableOrientation` | . | src/index.ts | ./layout/resizable.svelte | porté | 0 | — |
| `ResizablePane` | . | src/index.ts | ./layout/resizable-pane.svelte | porté | 6 | — |
| `ResizableSplit` | . | src/index.ts | ./layout/resizable-split.svelte | porté | 6 | — |
| `resolveBase` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveClassName` | . | src/index.ts | — | exclu | 0 | — |
| `resolveColor` | . | src/index.ts | ./lib/resolved-color | porté | 0 | — |
| `ResolvedTheme` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveTheme` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `resolveToken` | . | src/index.ts | ./lib/resolved-color | porté | 0 | — |
| `Rgb` | . | src/index.ts | ./lib/resolved-color | porté | 0 | — |
| `RgbaColor` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `rgbString` | . | src/index.ts | ./lib/resolved-color | porté | 0 | — |
| `Role` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `RULES` | ./ratchet | src/ratchet/index.ts | ./rules.ts | porté | 0 | — |
| `runRatchet` | ./ratchet | src/ratchet/index.ts | src/ratchet/index.ts | porté | 0 | — |
| `scanHintTargets` | . | src/index.ts | ./lots/f2-overlays-menus/hint-targets | porté | 0 | — |
| `ScrollArea` | . | src/index.ts | ./scroll-area.svelte | porté | 2 | — |
| `ScrollEdges` | . | src/index.ts | ./scroll-fade | porté | 0 | — |
| `ScrollFade` | . | src/index.ts | ./scroll-fade | porté | 2 | — |
| `ScrollRail` | . | src/index.ts | ./blocks/scroll-rail.svelte | porté | 3 | — |
| `SearchOverlay` | . | src/index.ts | ./lots/f2-overlays-menus/search-overlay.svelte | porté | 10 | — |
| `SearchOverlayProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `SearchResult` | . | src/index.ts | ./lots/f2-overlays-menus/search-overlay-types | porté | 10 | — |
| `SearchResultRow` | . | src/index.ts | ./lots/f2-overlays-menus/search-result-row.svelte | porté | 10 | — |
| `SearchStatus` | . | src/index.ts | ./lots/f2-overlays-menus/search-overlay-types | porté | 10 | — |
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
| `selectableIds` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 15 | — |
| `SelectOption` | . | src/index.ts | ./select-types | porté | 0 | — |
| `SelectProps` | . | src/index.ts | ./select-types | porté | 13 | — |
| `SendGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `Separator` | . | src/index.ts | ./separator.svelte | porté | 3 | — |
| `Session` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `SessionErrorView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `SessionLabel` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `SessionMeta` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `SessionPhase` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `SessionPipeline` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-pipeline.svelte | porté | 4 | — |
| `SessionPipelineProps` | ./session | src/session.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `SessionPriority` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `SessionStatus` | . | src/index.ts | ./lib/types | porté | 0 | — |
| `SessionStatusKind` | . | src/index.ts | ./lots/f4-ui-second-half-patterns/status-icon.svelte | porté | 0 | — |
| `SessionTimeline` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-timeline.svelte | porté | 17 | — |
| `SessionTimelineProps` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-block-props | porté | 0 | — |
| `SessionView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
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
| `slideGeometry` | . | src/index.ts | ./lots/f1-primitives-forms/hint-group/slide-geometry | porté | 0 | — |
| `SlideGeometry` | . | src/index.ts | ./lots/f1-primitives-forms/hint-group/slide-geometry | porté | 0 | — |
| `Slider` | . | src/index.ts | ./slider.svelte | porté | 5 | — |
| `SliderProps` | . | src/index.ts | ./slider.svelte | porté | 5 | — |
| `slideTransition` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `SPACES_TOOL_GROUPS` | . | src/index.ts | ./canvas/canvas-toolbar.svelte | porté | 11 | — |
| `Spinner` | . | src/index.ts | src/components/ui/spinner.svelte | vérifié | 15 | tests/tab-strip.test.ts |
| `SplitButton` | . | src/index.ts | ./split-button.svelte | porté | 4 | — |
| `SplitButtonProps` | . | src/index.ts | ./split-button.svelte | porté | 0 | — |
| `splitGlyphCombo` | . | src/index.ts | ./lib/combo | porté | 0 | — |
| `splitHighlights` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 0 | — |
| `splitIncremental` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `splitTopLevelBlocks` | ./session | src/session.ts | ./lots/f7-session-comms/session/markdown-blocks | porté | 0 | — |
| `SPRING_DOCK` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_INDICATOR` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_PILL` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `SPRING_RAIL` | . | src/index.ts | ../../lib/motion | porté | 1 | — |
| `StatCard` | . | src/index.ts | ./stat-card.svelte | porté | 7 | — |
| `StatGrid` | . | src/index.ts | ./stat-grid.svelte | porté | 7 | — |
| `StatusDot` | . | src/index.ts | ./status-dot.svelte | porté | 15 | — |
| `StatusDotCutout` | . | src/index.ts | ./lots/f4-ui-second-half-patterns/status-dot.svelte | porté | 0 | — |
| `StatusDotProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `StatusDotSize` | . | src/index.ts | ./lots/f4-ui-second-half-patterns/status-dot.svelte | porté | 0 | — |
| `StatusDotTone` | . | src/index.ts | ./status-dot.svelte | porté | 5 | — |
| `StatusIcon` | . | src/index.ts | ../f4-ui-second-half-patterns/status-icon.svelte | porté | 24 | — |
| `statusIconOf` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `stepHighlight` | . | src/index.ts | ./lots/f2-overlays-menus/command-list | porté | 0 | — |
| `StepList` | . | src/index.ts | ./step-list.svelte | porté | 5 | — |
| `StepListProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `StepListStep` | . | src/index.ts | ./step-list.svelte | porté | 0 | — |
| `StepStatus` | . | src/index.ts | ./step-list.svelte | porté | 0 | — |
| `StreamingMarkdown` | ./session | src/session.ts | ./lots/f7-session-comms/session/streaming-markdown.svelte | porté | 4 | — |
| `StreamingMarkdownProps` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-block-props | porté | 0 | — |
| `StreamingState` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `strictRules` | ./ratchet | src/ratchet/index.ts | ./rules.ts | porté | 0 | — |
| `stripAnsi` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `Switch` | . | src/index.ts | ./lots/f1-primitives-forms/switch.svelte | porté | 24 | — |
| `SwitchProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 7 | — |
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
| `tabsListVariants` | ., ./variants | src/index.ts | ./lots/f4-ui-second-half-patterns/tabs/tabs-variants | porté | 0 | — |
| `TabsTrigger` | . | src/index.ts | ./tabs/tabs-trigger.svelte | porté | 7 | — |
| `TabStrip` | . | src/index.ts | src/components/layout/tab-strip.svelte | vérifié | 10 | tests/tab-strip.test.ts |
| `TabStripItem` | . | src/index.ts | src/components/layout/tab-strip-logic.ts | porté | 0 | — |
| `TabStripTabProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `Tag` | . | src/index.ts | ./tag.svelte | porté | 8 | — |
| `TerminalBlock` | . | src/index.ts | ./code-surface/terminal-block.svelte | porté | 18 | — |
| `TerminalBlockProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `TerminalCommandInput` | . | src/index.ts | ./code-surface/command-input.svelte | porté | 6 | — |
| `TerminalCommandInputProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `TerminalLine` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `TerminalLinkKind` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 0 | — |
| `TerminalOutput` | . | src/index.ts | ./code-surface/terminal-output.svelte | porté | 18 | — |
| `TerminalOutputLine` | . | src/index.ts | ./lots/f6-canvas-code/code-surface/terminal-output-line.svelte | porté | 0 | — |
| `TerminalOutputProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `TerminalPalette` | . | src/index.ts | ./code-surface/terminal-palette.svelte | porté | 1 | — |
| `TerminalSegment` | . | src/index.ts | src/lots/f6-canvas-code/code-surface/code-surface.ts | porté | 18 | — |
| `TerminalStatus` | . | src/index.ts | ./code-surface/terminal-status.svelte | porté | 6 | — |
| `TerminalStatusProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `TerminalStopControl` | . | src/index.ts | ./code-surface/terminal-stop-control.svelte | porté | 7 | — |
| `TerminalStopControlProps` | . | src/index.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `TerminalView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `Textarea` | . | src/index.ts | ./textarea.svelte | porté | 4 | — |
| `TextLink` | . | src/index.ts | ./text-link.svelte | porté | 3 | — |
| `Theme` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `THEME_KEY_DEFINITION_BY_KEY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `THEME_KEY_REGISTRY` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 1 | — |
| `ThemeAppearance` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `themeFromToml` | ./theme | src/theme/index.ts | ./parse-theme | porté | 0 | — |
| `themeInitScript` | ., ./blocks | src/index.ts | ./lib/theme-script | porté | 0 | — |
| `ThemeKey` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyDefinition` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyRule` | ./theme | src/theme/index.ts | src/theme/theme-key-registry.ts | porté | 0 | — |
| `ThemeKeyStyle` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeKeyValue` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeMode` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeOverride` | ./theme | src/theme/index.ts | ./resolve-theme | porté | 0 | — |
| `ThemeProvider` | ., ./blocks | src/index.ts | ./deps/theme-provider.svelte | porté | 17 | — |
| `ThemeSetting` | ., ./blocks | src/index.ts | ./lots/exports-20261108/use-theme.svelte | porté | 0 | — |
| `ThemeToggle` | . | src/index.ts | ./shell/theme-toggle.svelte | porté | 8 | — |
| `ThemeVariant` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `ThemeWarning` | ./theme | src/theme/index.ts | src/theme/types.ts | porté | 0 | — |
| `TimelineCalendar` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | ../lots/f8-blocks-foundations/blocks/timeline-calendar.svelte | porté | 8 | — |
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
| `toggleVariants` | ., ./variants | src/index.ts | ./lots/f1-primitives-forms/toggle-variants | porté | 0 | — |
| `toHsv` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `TOOL_KIND_ICON` | ./session | src/session.ts | ./lots/f7-session-comms/session/tool-call-card.svelte | porté | 0 | — |
| `ToolCallCard` | ./session | src/session.ts | ./lots/f7-session-comms/session/tool-call-card.svelte | porté | 16 | — |
| `ToolCallCardLabels` | ./session | src/session.ts | ./lots/f7-session-comms/session/tool-call-labels | porté | 0 | — |
| `ToolCallCardProps` | ./session | src/session.ts | ./lots/exports-20261108/props | porté | 0 | — |
| `ToolCallView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `ToolKind` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `toolKindOf` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view-helpers | porté | 0 | — |
| `ToolStatus` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `Tooltip` | . | src/index.ts | ./tooltip.svelte | porté | 7 | — |
| `TOOLTIP_EASE` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TOOLTIP_FADE_IN_MS` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TOOLTIP_FADE_OUT_MS` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TOOLTIP_OPEN_DELAY` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TOOLTIP_SLIDE_MS` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TOOLTIP_WARM_WINDOW` | . | src/index.ts | ./ui/tooltip-timing | porté | 0 | — |
| `TooltipContent` | . | src/index.ts | ./tooltip-content.svelte | porté | 7 | — |
| `TooltipProvider` | . | src/index.ts | ./tooltip-provider.svelte | porté | 7 | — |
| `TooltipTrigger` | . | src/index.ts | ./tooltip-trigger.svelte | porté | 7 | — |
| `TraceAuthor` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 19 | — |
| `TraceAvatar` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/trace-avatar.svelte | porté | 19 | — |
| `TraceCheckpoint` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceDensity` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte | porté | 0 | — |
| `TraceGroupBy` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceLabels` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace.svelte | porté | 0 | — |
| `TraceRange` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 0 | — |
| `TraceSession` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 19 | — |
| `TraceZoom` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | ../lots/f8-blocks-foundations/blocks/checkpoint-trace-model | porté | 19 | — |
| `transcriptRows` | . | src/index.ts | ./comms/comms-view-helpers | porté | 21 | — |
| `TRANSITION_ALL_RULE` | ./ratchet | src/ratchet/index.ts | ./rules.ts | porté | 0 | — |
| `TrashGlyph` | . | src/index.ts | ./animated-icon | porté | 3 | — |
| `TurnRow` | ./session | src/session.ts | ./lots/f7-session-comms/session/turn-row.svelte | porté | 23 | — |
| `TurnRowProps` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-block-props | porté | 0 | — |
| `TurnView` | ./session | src/session.ts | ./lots/f7-session-comms/session/session-view | porté | 0 | — |
| `UI_SCALE_DEFAULT` | . | src/index.ts | ./lots/f5-layout-shell/shell/ui-scale | porté | 0 | — |
| `UI_SCALE_MAX` | . | src/index.ts | ./shell/ui-scale | porté | 6 | — |
| `UI_SCALE_MIN` | . | src/index.ts | ./shell/ui-scale | porté | 6 | — |
| `UI_SCALE_PRESETS` | . | src/index.ts | ./lots/f5-layout-shell/shell/ui-scale | porté | 0 | — |
| `UI_SCALE_STEP` | . | src/index.ts | ./lots/f5-layout-shell/shell/ui-scale | porté | 0 | — |
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
| `useLinks` | . | src/index.ts | ./lots/exports-20261108/use-links | porté | 0 | — |
| `useListHighlight` | . | src/index.ts | ./lots/exports-20261108/use-list-highlight.svelte | porté | 15 | — |
| `useMeasure` | . | src/index.ts | ./lots/exports-20261108/use-measure.svelte | porté | 0 | — |
| `useScrollEdges` | . | src/index.ts | ./scroll-fade | porté | 2 | — |
| `useSidebar` | . | src/index.ts | ./shell/sidebar | porté | 6 | — |
| `useSideDock` | . | src/index.ts | ./layout/app-frame | porté | 15 | — |
| `useSideDockRoom` | . | src/index.ts | ./layout/app-frame | porté | 15 | — |
| `useTheme` | ., ./blocks | src/index.ts | ./lots/exports-20261108/use-theme.svelte | porté | 0 | — |
| `useToastManager` | . | src/index.ts | ./toast/toast-manager.svelte | porté | 7 | — |
| `useWindow` | ./session | src/session.ts | ./lots/f7-session-comms/session/use-window.svelte | porté | 0 | — |
| `VoyageMark` | . | src/index.ts | ./provider-marks/voyage-mark.svelte | porté | 3 | — |
| `withAlpha` | ./theme | src/theme/index.ts | ./color | porté | 0 | — |
| `XAIMark` | . | src/index.ts | ./provider-marks/xai-mark.svelte | porté | 3 | — |
| `XMark` | . | src/index.ts | ./x-mark.svelte | porté | 8 | — |
| `ZedMark` | . | src/index.ts | ./zed-mark.svelte | porté | 8 | — |
| `ZhipuMark` | . | src/index.ts | ./provider-marks/zhipu-mark.svelte | porté | 3 | — |

## Exports exclus

| Export | Entrées | Justification |
|---|---|---|
| `ContextMenuPortal` | . | Base UI portal wrapper with no DOM of its own; the Svelte context menu portals its positioner with the `portal` action. |
| `DialogPortal` | . | Base UI portal wrapper with no DOM of its own; the Svelte dialog portals its content with the `portal` action, and a component would add a wrapper element the source does not render. |
| `DropdownMenuPortal` | . | Base UI portal wrapper with no DOM of its own; the Svelte menu portals its positioner with the `portal` action. |
| `PopoverPortal` | . | Base UI portal wrapper with no DOM of its own; the Svelte popover portals its positioner with the `portal` action. |
| `resolveClassName` | . | Resolves Base UI's state-function `className`; Svelte components take class strings, so there is nothing to resolve. |

## Stories

| id | Titre | Fichier | Svelte | Statut | Preuves | Propriétaire |
|---|---|---|---|---|---|---|
| `foundations-principles--page` | Foundations/Principles / Page | stories/foundations/principles.stories.tsx | gallery ?story=foundations-principles--page | vérifié | 0/6 identiques, max 0.000 % | f8-blocks-foundations |
| `foundations-colour--page` | Foundations/Colour / Page | stories/foundations/colour.stories.tsx | gallery ?story=foundations-colour--page | écart identifié | 0/6 identiques, max 0.009 % | f8-blocks-foundations |
| `foundations-type--page` | Foundations/Type / Page | stories/foundations/type.stories.tsx | gallery ?story=foundations-type--page | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `foundations-control-heights--page` | Foundations/Control heights / Page | stories/foundations/control-heights.stories.tsx | gallery ?story=foundations-control-heights--page | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `foundations-spacing--page` | Foundations/Spacing / Page | stories/foundations/spacing.stories.tsx | gallery ?story=foundations-spacing--page | écart identifié | 2/6 identiques, max 0.010 % | f8-blocks-foundations |
| `foundations-radius--page` | Foundations/Radius / Page | stories/foundations/radius.stories.tsx | gallery ?story=foundations-radius--page | écart identifié | 0/6 identiques, max 0.004 % | f8-blocks-foundations |
| `foundations-elevation--page` | Foundations/Elevation / Page | stories/foundations/elevation.stories.tsx | gallery ?story=foundations-elevation--page | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `foundations-z-index--page` | Foundations/Z-index / Page | stories/foundations/z-index.stories.tsx | gallery ?story=foundations-z-index--page | écart identifié | 2/6 identiques, max 0.003 % | f8-blocks-foundations |
| `foundations-motion--page` | Foundations/Motion / Page | stories/foundations/motion.stories.tsx | gallery ?story=foundations-motion--page | écart identifié | 2/6 identiques, max 0.003 % | f8-blocks-foundations |
| `foundations-icons--page` | Foundations/Icons / Page | stories/foundations/icons.stories.tsx | gallery ?story=foundations-icons--page | écart identifié | 0/6 identiques, max 0.005 % | f8-blocks-foundations |
| `primitives-animatedicon--off` | Primitives/AnimatedIcon / Off | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--off | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-animatedicon--on` | Primitives/AnimatedIcon / On | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--on | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-animatedicon--one-shots` | Primitives/AnimatedIcon / One Shots | stories/ui/animated-icon.stories.tsx | gallery ?story=primitives-animatedicon--one-shots | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-badge--default` | Primitives/Badge / Default | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-badge--variants` | Primitives/Badge / Variants | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--variants | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-badge--sizes` | Primitives/Badge / Sizes | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--sizes | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-badge--with-icon` | Primitives/Badge / With Icon | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--with-icon | vérifié | 0/6 identiques, max 0.001 % | lot témoin |
| `primitives-badge--long-text` | Primitives/Badge / Long Text | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--long-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-badge--empty` | Primitives/Badge / Empty | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--empty | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--default` | Primitives/Button / Default | stories/ui/button.stories.tsx | gallery ?story=primitives-button--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--variants` | Primitives/Button / Variants | stories/ui/button.stories.tsx | gallery ?story=primitives-button--variants | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--sizes` | Primitives/Button / Sizes | stories/ui/button.stories.tsx | gallery ?story=primitives-button--sizes | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--secondary` | Primitives/Button / Secondary | stories/ui/button.stories.tsx | gallery ?story=primitives-button--secondary | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--outline` | Primitives/Button / Outline | stories/ui/button.stories.tsx | gallery ?story=primitives-button--outline | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--ghost` | Primitives/Button / Ghost | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--destructive` | Primitives/Button / Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--destructive | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--ghost-destructive` | Primitives/Button / Ghost Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost-destructive | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--disabled` | Primitives/Button / Disabled | stories/ui/button.stories.tsx | gallery ?story=primitives-button--disabled | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--loading` | Primitives/Button / Loading | stories/ui/button.stories.tsx | gallery ?story=primitives-button--loading | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--with-icon` | Primitives/Button / With Icon | stories/ui/button.stories.tsx | gallery ?story=primitives-button--with-icon | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--pressed` | Primitives/Button / Pressed | stories/ui/button.stories.tsx | gallery ?story=primitives-button--pressed | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-button--long-text` | Primitives/Button / Long Text | stories/ui/button.stories.tsx | gallery ?story=primitives-button--long-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-colorpicker--default` | Primitives/ColorPicker / Default | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-colorpicker--red` | Primitives/ColorPicker / Red | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--red | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-colorpicker--black` | Primitives/ColorPicker / Black | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--black | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-colorpicker--hue-slider-alone` | Primitives/ColorPicker / Hue Slider Alone | stories/ui/color-picker.stories.tsx | gallery ?story=primitives-colorpicker--hue-slider-alone | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-command--default` | Primitives/Command / Default | stories/ui/command.stories.tsx | gallery ?story=primitives-command--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-command--open` | Primitives/Command / Open | stories/ui/command.stories.tsx | gallery ?story=primitives-command--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-command--empty` | Primitives/Command / Empty | stories/ui/command.stories.tsx | gallery ?story=primitives-command--empty | écart identifié | 3/6 identiques, max 0.001 % | f2-overlays-menus |
| `primitives-command--disabled-row` | Primitives/Command / Disabled Row | stories/ui/command.stories.tsx | gallery ?story=primitives-command--disabled-row | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-command--compact` | Primitives/Command / Compact | stories/ui/command.stories.tsx | gallery ?story=primitives-command--compact | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-command--compact-without-roles` | Primitives/Command / Compact Without Roles | stories/ui/command.stories.tsx | gallery ?story=primitives-command--compact-without-roles | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-contextmenu--default` | Primitives/ContextMenu / Default | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-contextmenu--open` | Primitives/ContextMenu / Open | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--open | vérifié | 0/6 identiques, max 0.001 % | f2-overlays-menus |
| `primitives-contextmenu--disabled-item` | Primitives/ContextMenu / Disabled Item | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--disabled-item | vérifié | 0/6 identiques, max 0.001 % | f2-overlays-menus |
| `primitives-contextmenu--exit` | Primitives/ContextMenu / Exit | stories/ui/context-menu.stories.tsx | gallery ?story=primitives-contextmenu--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dialog--default` | Primitives/Dialog / Default | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--open` | Primitives/Dialog / Open | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--open | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--destructive` | Primitives/Dialog / Destructive | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--destructive | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--without-close-button` | Primitives/Dialog / Without Close Button | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--without-close-button | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--long-text` | Primitives/Dialog / Long Text | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--long-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--media` | Primitives/Dialog / Media | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--media | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--large-blurred` | Primitives/Dialog / Large Blurred | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--large-blurred | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dropdownmenu--default` | Primitives/DropdownMenu / Default | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--open` | Primitives/DropdownMenu / Open | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--icon-rows-align` | Primitives/DropdownMenu / Icon Rows Align | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--icon-rows-align | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--disabled-item` | Primitives/DropdownMenu / Disabled Item | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--disabled-item | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--long-text` | Primitives/DropdownMenu / Long Text | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--exit` | Primitives/DropdownMenu / Exit | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-dropdownmenu--recipes` | Primitives/DropdownMenu / Recipes | stories/ui/dropdown-menu.stories.tsx | gallery ?story=primitives-dropdownmenu--recipes | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-hintgroup--default` | Primitives/HintGroup / Default | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-hintgroup--opens-upward` | Primitives/HintGroup / Opens Upward | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--opens-upward | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-hintgroup--with-disabled` | Primitives/HintGroup / With Disabled | stories/ui/hint-group.stories.tsx | gallery ?story=primitives-hintgroup--with-disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--default` | Primitives/IconButton / Default | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--variants` | Primitives/IconButton / Variants | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--variants | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--sizes` | Primitives/IconButton / Sizes | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--sizes | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--ghost-destructive` | Primitives/IconButton / Ghost Destructive | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--ghost-destructive | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--active` | Primitives/IconButton / Active | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--active | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--pressed` | Primitives/IconButton / Pressed | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--pressed | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--round-stepper` | Primitives/IconButton / Round Stepper | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--round-stepper | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--disabled` | Primitives/IconButton / Disabled | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--with-hint` | Primitives/IconButton / With Hint | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--with-hint | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--element-icon` | Primitives/IconButton / Element Icon | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--element-icon | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--tile-remove` | Primitives/IconButton / Tile Remove | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--tile-remove | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--floating` | Primitives/IconButton / Floating | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--floating | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-iconbutton--loading` | Primitives/IconButton / Loading | stories/ui/icon-button.stories.tsx | gallery ?story=primitives-iconbutton--loading | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-icon--default` | Primitives/Icon / Default | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-icon--sizes` | Primitives/Icon / Sizes | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--sizes | écart identifié | 3/6 identiques, max 0.006 % | lot témoin |
| `primitives-icon--muted` | Primitives/Icon / Muted | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--muted | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-icon--beside-text` | Primitives/Icon / Beside Text | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--beside-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--default` | Primitives/Input / Default | stories/ui/input.stories.tsx | gallery ?story=primitives-input--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--filled` | Primitives/Input / Filled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--filled | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--sizes` | Primitives/Input / Sizes | stories/ui/input.stories.tsx | gallery ?story=primitives-input--sizes | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--disabled` | Primitives/Input / Disabled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--disabled | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--invalid` | Primitives/Input / Invalid | stories/ui/input.stories.tsx | gallery ?story=primitives-input--invalid | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--long-text` | Primitives/Input / Long Text | stories/ui/input.stories.tsx | gallery ?story=primitives-input--long-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-input--with-icon` | Primitives/Input / With Icon | stories/ui/input.stories.tsx | gallery ?story=primitives-input--with-icon | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--default` | Primitives/Kbd / Default | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--sizes` | Primitives/Kbd / Sizes | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--sizes | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--combo` | Primitives/Kbd / Combo | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--combo | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--variants` | Primitives/Kbd / Variants | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--variants | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--platforms` | Primitives/Kbd / Platforms | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--platforms | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--long-text` | Primitives/Kbd / Long Text | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--long-text | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-popover--default` | Primitives/Popover / Default | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--open` | Primitives/Popover / Open | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--with-arrow` | Primitives/Popover / With Arrow | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--with-arrow | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--tinted` | Primitives/Popover / Tinted | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--tinted | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--glass` | Primitives/Popover / Glass | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--glass | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--long-text` | Primitives/Popover / Long Text | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-popover--exit` | Primitives/Popover / Exit | stories/ui/popover.stories.tsx | gallery ?story=primitives-popover--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-scrollarea--default` | Primitives/ScrollArea / Default | stories/ui/scroll-area.stories.tsx | gallery ?story=primitives-scrollarea--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-scrollarea--empty` | Primitives/ScrollArea / Empty | stories/ui/scroll-area.stories.tsx | gallery ?story=primitives-scrollarea--empty | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-scrollfade--default` | Primitives/ScrollFade / Default | stories/ui/scroll-fade.stories.tsx | gallery ?story=primitives-scrollfade--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-scrollfade--short-list` | Primitives/ScrollFade / Short List | stories/ui/scroll-fade.stories.tsx | gallery ?story=primitives-scrollfade--short-list | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-secretinput--empty` | Primitives/SecretInput / Empty | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--empty | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-secretinput--configured` | Primitives/SecretInput / Configured | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--configured | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-secretinput--custom-placeholder` | Primitives/SecretInput / Custom Placeholder | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--custom-placeholder | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-secretinput--disabled` | Primitives/SecretInput / Disabled | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-secretinput--invalid` | Primitives/SecretInput / Invalid | stories/ui/secret-input.stories.tsx | gallery ?story=primitives-secretinput--invalid | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--default` | Primitives/Segmented / Default | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--small` | Primitives/Segmented / Small | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--small | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--disabled` | Primitives/Segmented / Disabled | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--no-selection` | Primitives/Segmented / No Selection | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--no-selection | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--with-icon` | Primitives/Segmented / With Icon | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--with-icon | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--icon-only` | Primitives/Segmented / Icon Only | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--icon-only | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--node-labels` | Primitives/Segmented / Node Labels | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--node-labels | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-segmented--long-text` | Primitives/Segmented / Long Text | stories/ui/segmented.stories.tsx | gallery ?story=primitives-segmented--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-select--default` | Primitives/Select / Default | stories/ui/select.stories.tsx | gallery ?story=primitives-select--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--open` | Primitives/Select / Open | stories/ui/select.stories.tsx | gallery ?story=primitives-select--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--exit` | Primitives/Select / Exit | stories/ui/select.stories.tsx | gallery ?story=primitives-select--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--ghost` | Primitives/Select / Ghost | stories/ui/select.stories.tsx | gallery ?story=primitives-select--ghost | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--pill` | Primitives/Select / Pill | stories/ui/select.stories.tsx | gallery ?story=primitives-select--pill | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--small` | Primitives/Select / Small | stories/ui/select.stories.tsx | gallery ?story=primitives-select--small | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--disabled` | Primitives/Select / Disabled | stories/ui/select.stories.tsx | gallery ?story=primitives-select--disabled | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--placeholder` | Primitives/Select / Placeholder | stories/ui/select.stories.tsx | gallery ?story=primitives-select--placeholder | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--with-label` | Primitives/Select / With Label | stories/ui/select.stories.tsx | gallery ?story=primitives-select--with-label | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--empty` | Primitives/Select / Empty | stories/ui/select.stories.tsx | gallery ?story=primitives-select--empty | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--with-icon` | Primitives/Select / With Icon | stories/ui/select.stories.tsx | gallery ?story=primitives-select--with-icon | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--no-indicator` | Primitives/Select / No Indicator | stories/ui/select.stories.tsx | gallery ?story=primitives-select--no-indicator | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-select--long-text` | Primitives/Select / Long Text | stories/ui/select.stories.tsx | gallery ?story=primitives-select--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-slider--default` | Primitives/Slider / Default | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-slider--minimum` | Primitives/Slider / Minimum | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--minimum | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-slider--maximum` | Primitives/Slider / Maximum | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--maximum | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-slider--stepped` | Primitives/Slider / Stepped | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--stepped | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-slider--disabled` | Primitives/Slider / Disabled | stories/ui/slider.stories.tsx | gallery ?story=primitives-slider--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-splitbutton--default` | Primitives/SplitButton / Default | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-splitbutton--busy` | Primitives/SplitButton / Busy | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--busy | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-splitbutton--disabled` | Primitives/SplitButton / Disabled | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-splitbutton--open` | Primitives/SplitButton / Open | stories/ui/split-button.stories.tsx | gallery ?story=primitives-splitbutton--open | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--off` | Primitives/Switch / Off | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--off | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--on` | Primitives/Switch / On | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--on | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--mixed` | Primitives/Switch / Mixed | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--mixed | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--small` | Primitives/Switch / Small | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--small | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--disabled` | Primitives/Switch / Disabled | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--check-appearance` | Primitives/Switch / Check Appearance | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--check-appearance | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-switch--in-a-settings-row` | Primitives/Switch / In A Settings Row | stories/ui/switch.stories.tsx | gallery ?story=primitives-switch--in-a-settings-row | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `primitives-tooltip--default` | Primitives/Tooltip / Default | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--open` | Primitives/Tooltip / Open | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--open-below` | Primitives/Tooltip / Open Below | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--open-below | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--long-text` | Primitives/Tooltip / Long Text | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--hint-row` | Primitives/Tooltip / Hint Row | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--hint-row | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--hint-keycaps` | Primitives/Tooltip / Hint Keycaps | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--hint-keycaps | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `primitives-tooltip--exit` | Primitives/Tooltip / Exit | stories/ui/tooltip.stories.tsx | gallery ?story=primitives-tooltip--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-ditherfield--default` | Components/DitherField / Default | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-ditherfield--dots` | Components/DitherField / Dots | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--dots | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-ditherfield--recoloured` | Components/DitherField / Recoloured | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--recoloured | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-ditherfield--inside-theme-provider` | Components/DitherField / Inside Theme Provider | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--inside-theme-provider | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-ditherfield--with-copy` | Components/DitherField / With Copy | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--with-copy | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-ditherfield--no-canvas` | Components/DitherField / No Canvas | stories/components/blocks/dither-field.stories.tsx | gallery ?story=components-ditherfield--no-canvas | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-logomarquee--default` | Components/LogoMarquee / Default | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-logomarquee--marks` | Components/LogoMarquee / Marks | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--marks | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-logomarquee--no-label` | Components/LogoMarquee / No Label | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--no-label | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `components-logomarquee--many-items` | Components/LogoMarquee / Many Items | stories/components/blocks/logo-marquee.stories.tsx | gallery ?story=components-logomarquee--many-items | écart identifié | 5/6 identiques, max 0.002 % | f8-blocks-foundations |
| `components-accordion--default` | Components/Accordion / Default | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-accordion--open` | Components/Accordion / Open | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--open | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-accordion--multiple` | Components/Accordion / Multiple | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--multiple | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-accordion--disabled` | Components/Accordion / Disabled | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--disabled | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-accordion--long-text` | Components/Accordion / Long Text | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-accordion--many-items` | Components/Accordion / Many Items | stories/components/ui/accordion.stories.tsx | gallery ?story=components-accordion--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-agenticon--external-monochrome` | Components/AgentIcon / External Monochrome | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--external-monochrome | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-agenticon--external-colour` | Components/AgentIcon / External Colour | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--external-colour | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-agenticon--monogram` | Components/AgentIcon / Monogram | stories/components/ui/agent-icon.stories.tsx | gallery ?story=components-agenticon--monogram | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-alertdialog--default` | Components/AlertDialog / Default | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-alertdialog--open` | Components/AlertDialog / Open | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-alertdialog--not-destructive` | Components/AlertDialog / Not Destructive | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--not-destructive | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-alertdialog--long-text` | Components/AlertDialog / Long Text | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-alertdialog--parts` | Components/AlertDialog / Parts | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--parts | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-alertdialog--blurred-dismissible` | Components/AlertDialog / Blurred Dismissible | stories/components/ui/alert-dialog.stories.tsx | gallery ?story=components-alertdialog--blurred-dismissible | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-atlasmark--default` | Components/AtlasMark / Default | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--sizes` | Components/AtlasMark / Sizes | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--sizes | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--inks` | Components/AtlasMark / Inks | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--inks | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--badge` | Components/AtlasMark / Badge | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--badge | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--wordmark` | Components/AtlasMark / Wordmark | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--wordmark | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--badge-tones` | Components/AtlasMark / Badge Tones | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--badge-tones | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-atlasmark--lockups` | Components/AtlasMark / Lockups | stories/components/ui/atlas-mark.stories.tsx | gallery ?story=components-atlasmark--lockups | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatarstack--default` | Components/AvatarStack / Default | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatarstack--empty` | Components/AvatarStack / Empty | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--empty | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatarstack--single` | Components/AvatarStack / Single | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--single | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatarstack--large` | Components/AvatarStack / Large | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--large | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatarstack--many-items` | Components/AvatarStack / Many Items | stories/components/ui/avatar-stack.stories.tsx | gallery ?story=components-avatarstack--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--default` | Components/Avatar / Default | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--with-image` | Components/Avatar / With Image | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--with-image | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--error-state` | Components/Avatar / Error | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--error-state | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--sizes` | Components/Avatar / Sizes | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--sizes | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--group` | Components/Avatar / Group | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--group | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-avatar--many-items` | Components/Avatar / Many Items | stories/components/ui/avatar.stories.tsx | gallery ?story=components-avatar--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--social` | Components/BrandMarks / Social | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--social | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--agents` | Components/BrandMarks / Agents | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--agents | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--models` | Components/BrandMarks / Models | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--models | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--editors` | Components/BrandMarks / Editors | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--editors | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--sizes` | Components/BrandMarks / Sizes | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--sizes | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--on-card` | Components/BrandMarks / On Card | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--on-card | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--titled-model-marks` | Components/BrandMarks / Titled Model Marks | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--titled-model-marks | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-brandmarks--in-buttons` | Components/BrandMarks / In Buttons | stories/components/ui/brand-marks.stories.tsx | gallery ?story=components-brandmarks--in-buttons | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-breadcrumb--default` | Components/Breadcrumb / Default | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-breadcrumb--single` | Components/Breadcrumb / Single | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--single | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-breadcrumb--collapsed` | Components/Breadcrumb / Collapsed | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--collapsed | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-breadcrumb--many-items` | Components/Breadcrumb / Many Items | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-breadcrumb--long-text` | Components/Breadcrumb / Long Text | stories/components/ui/breadcrumb.stories.tsx | gallery ?story=components-breadcrumb--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--default` | Components/Callout / Default | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--tones` | Components/Callout / Tones | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tones | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--error-state` | Components/Callout / Error | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--error-state | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--with-action` | Components/Callout / With Action | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--with-action | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--custom-icon` | Components/Callout / Custom Icon | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--custom-icon | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--no-icon` | Components/Callout / No Icon | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--no-icon | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--long-text` | Components/Callout / Long Text | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--recipe` | Components/Callout / Recipe | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--recipe | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--tucked` | Components/Callout / Tucked | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tucked | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--tucked-tones` | Components/Callout / Tucked Tones | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--tucked-tones | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-callout--animated` | Components/Callout / Animated | stories/components/ui/callout.stories.tsx | gallery ?story=components-callout--animated | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-checkbox--default` | Components/Checkbox / Default | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--checked` | Components/Checkbox / Checked | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--checked | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--indeterminate` | Components/Checkbox / Indeterminate | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--indeterminate | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--disabled` | Components/Checkbox / Disabled | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--error-state` | Components/Checkbox / Error | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--error-state | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--long-text` | Components/Checkbox / Long Text | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-checkbox--many-items` | Components/Checkbox / Many Items | stories/components/ui/checkbox.stories.tsx | gallery ?story=components-checkbox--many-items | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-code--default` | Components/Code / Default | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--in-sentence` | Components/Code / In Sentence | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--in-sentence | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--block` | Components/Code / Block | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--block | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--long-text` | Components/Code / Long Text | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--diff` | Components/Code / Diff | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--diff | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--diff-options` | Components/Code / Diff Options | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--diff-options | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-code--fence` | Components/Code / Fence | stories/components/ui/code-block.stories.tsx | gallery ?story=components-code--fence | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-collapsible--default` | Components/Collapsible / Default | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-collapsible--open` | Components/Collapsible / Open | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--open | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-collapsible--disabled` | Components/Collapsible / Disabled | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--disabled | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-collapsible--many-items` | Components/Collapsible / Many Items | stories/components/ui/collapsible.stories.tsx | gallery ?story=components-collapsible--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-combobox--default` | Components/Combobox / Default | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--open` | Components/Combobox / Open | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--with-clear` | Components/Combobox / With Clear | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--with-clear | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--disabled` | Components/Combobox / Disabled | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--disabled | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--empty` | Components/Combobox / Empty | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--empty | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--many-items` | Components/Combobox / Many Items | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--many-items | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--long-text` | Components/Combobox / Long Text | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--grouped` | Components/Combobox / Grouped | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--grouped | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--button-trigger` | Components/Combobox / Button Trigger | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--button-trigger | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--chips` | Components/Combobox / Chips | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--chips | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--chips-open` | Components/Combobox / Chips Open | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--chips-open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-combobox--exit` | Components/Combobox / Exit | stories/components/ui/combobox.stories.tsx | gallery ?story=components-combobox--exit | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-emptystate--default` | Components/EmptyState / Default | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-emptystate--with-action` | Components/EmptyState / With Action | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--with-action | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-emptystate--title-only` | Components/EmptyState / Title Only | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--title-only | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-emptystate--no-results` | Components/EmptyState / No Results | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--no-results | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-emptystate--long-text` | Components/EmptyState / Long Text | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-emptystate--custom-icon` | Components/EmptyState / Custom Icon | stories/components/ui/empty-state.stories.tsx | gallery ?story=components-emptystate--custom-icon | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-field--default` | Components/Field / Default | stories/components/ui/field.stories.tsx | gallery ?story=components-field--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--disabled` | Components/Field / Disabled | stories/components/ui/field.stories.tsx | gallery ?story=components-field--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--error-state` | Components/Field / Error | stories/components/ui/field.stories.tsx | gallery ?story=components-field--error-state | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--long-text` | Components/Field / Long Text | stories/components/ui/field.stories.tsx | gallery ?story=components-field--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--horizontal` | Components/Field / Horizontal | stories/components/ui/field.stories.tsx | gallery ?story=components-field--horizontal | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--form` | Components/Field / Form | stories/components/ui/field.stories.tsx | gallery ?story=components-field--form | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--choice-card` | Components/Field / Choice Card | stories/components/ui/field.stories.tsx | gallery ?story=components-field--choice-card | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-field--many-errors` | Components/Field / Many Errors | stories/components/ui/field.stories.tsx | gallery ?story=components-field--many-errors | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-gochevron--default` | Components/GoChevron / Default | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-gochevron--bare` | Components/GoChevron / Bare | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--bare | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-gochevron--long-text` | Components/GoChevron / Long Text | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-gochevron--many-items` | Components/GoChevron / Many Items | stories/components/ui/go-chevron.stories.tsx | gallery ?story=components-gochevron--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-inputgroup--default` | Components/InputGroup / Default | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--disabled` | Components/InputGroup / Disabled | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--autofocused` | Components/InputGroup / Autofocused | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--autofocused | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--clicked` | Components/InputGroup / Clicked | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--clicked | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--error` | Components/InputGroup / Error | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--error | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--long-text` | Components/InputGroup / Long Text | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--with-button` | Components/InputGroup / With Button | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--with-button | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--with-text` | Components/InputGroup / With Text | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--with-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-inputgroup--textarea` | Components/InputGroup / Textarea | stories/components/ui/input-group.stories.tsx | gallery ?story=components-inputgroup--textarea | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-label--default` | Components/Label / Default | stories/components/ui/label.stories.tsx | gallery ?story=components-label--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-label--with-input` | Components/Label / With Input | stories/components/ui/label.stories.tsx | gallery ?story=components-label--with-input | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-label--with-checkbox` | Components/Label / With Checkbox | stories/components/ui/label.stories.tsx | gallery ?story=components-label--with-checkbox | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-label--disabled` | Components/Label / Disabled | stories/components/ui/label.stories.tsx | gallery ?story=components-label--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-label--long-text` | Components/Label / Long Text | stories/components/ui/label.stories.tsx | gallery ?story=components-label--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-mailboxicon--default` | Components/MailboxIcon / Default | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-mailboxicon--sizes` | Components/MailboxIcon / Sizes | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--sizes | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-mailboxicon--driven-by-parent` | Components/MailboxIcon / Driven By Parent | stories/components/ui/mailbox-icon.stories.tsx | gallery ?story=components-mailboxicon--driven-by-parent | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-messagesquaremoreicon--default` | Components/MessageSquareMoreIcon / Default | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-messagesquaremoreicon--sizes` | Components/MessageSquareMoreIcon / Sizes | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--sizes | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-messagesquaremoreicon--driven-by-parent` | Components/MessageSquareMoreIcon / Driven By Parent | stories/components/ui/message-square-more-icon.stories.tsx | gallery ?story=components-messagesquaremoreicon--driven-by-parent | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `components-modelbadge--default` | Components/ModelBadge / Default | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--families` | Components/ModelBadge / Families | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--families | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--sizes` | Components/ModelBadge / Sizes | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--unknown` | Components/ModelBadge / Unknown | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--unknown | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--explicit-family` | Components/ModelBadge / Explicit Family | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--explicit-family | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--long-name` | Components/ModelBadge / Long Name | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--long-name | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-modelbadge--marks` | Components/ModelBadge / Marks | stories/components/ui/model-badge.stories.tsx | gallery ?story=components-modelbadge--marks | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--default` | Components/Pill / Default | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--with-icon` | Components/Pill / With Icon | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--with-icon | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--removable` | Components/Pill / Removable | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--removable | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--status-dots` | Components/Pill / Status Dots | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--status-dots | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--many-items` | Components/Pill / Many Items | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--long-text` | Components/Pill / Long Text | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--as-button` | Components/Pill / As Button | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--as-button | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--sizes` | Components/Pill / Sizes | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--trailing-action` | Components/Pill / Trailing Action | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--trailing-action | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-pill--raised` | Components/Pill / Raised | stories/components/ui/pill.stories.tsx | gallery ?story=components-pill--raised | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--default` | Components/Progress / Default | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--empty` | Components/Progress / Empty | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--empty | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--complete` | Components/Progress / Complete | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--complete | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--loading` | Components/Progress / Loading | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--loading | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--long-text` | Components/Progress / Long Text | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--bare-track` | Components/Progress / Bare Track | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--bare-track | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--tones` | Components/Progress / Tones | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--tones | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-progress--many-items` | Components/Progress / Many Items | stories/components/ui/progress.stories.tsx | gallery ?story=components-progress--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-providermarks--all` | Components/ProviderMarks / All | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--all | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-providermarks--desktop-sizes` | Components/ProviderMarks / Desktop Sizes | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--desktop-sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-providermarks--on-card` | Components/ProviderMarks / On Card | stories/components/ui/provider-marks.stories.tsx | gallery ?story=components-providermarks--on-card | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-radiogroup--default` | Components/RadioGroup / Default | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-radiogroup--disabled` | Components/RadioGroup / Disabled | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-radiogroup--error` | Components/RadioGroup / Error | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--error | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-radiogroup--long-text` | Components/RadioGroup / Long Text | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-radiogroup--many-items` | Components/RadioGroup / Many Items | stories/components/ui/radio-group.stories.tsx | gallery ?story=components-radiogroup--many-items | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-separator--default` | Components/Separator / Default | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-separator--strong` | Components/Separator / Strong | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--strong | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-separator--vertical` | Components/Separator / Vertical | stories/components/ui/separator.stories.tsx | gallery ?story=components-separator--vertical | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-sheet--default` | Components/Sheet / Default | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-sheet--open` | Components/Sheet / Open | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-sheet--left` | Components/Sheet / Left | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--left | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-sheet--bottom` | Components/Sheet / Bottom | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--bottom | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-sheet--long-text` | Components/Sheet / Long Text | stories/components/ui/sheet.stories.tsx | gallery ?story=components-sheet--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `components-skeleton--default` | Components/Skeleton / Default | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-skeleton--loading` | Components/Skeleton / Loading | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--loading | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-skeleton--static-panel` | Components/Skeleton / Static Panel | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--static-panel | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-skeleton--card` | Components/Skeleton / Card | stories/components/ui/skeleton.stories.tsx | gallery ?story=components-skeleton--card | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-spinner--default` | Components/Spinner / Default | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-spinner--sizes` | Components/Spinner / Sizes | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-spinner--in-button` | Components/Spinner / In Button | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--in-button | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-spinner--with-text` | Components/Spinner / With Text | stories/components/ui/spinner.stories.tsx | gallery ?story=components-spinner--with-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusdot--default` | Components/StatusDot / Default | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusdot--tones` | Components/StatusDot / Tones | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--tones | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusdot--sizes` | Components/StatusDot / Sizes | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusdot--presence` | Components/StatusDot / Presence | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--presence | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusdot--on-an-icon` | Components/StatusDot / On An Icon | stories/components/ui/status-dot.stories.tsx | gallery ?story=components-statusdot--on-an-icon | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusicon--default` | Components/StatusIcon / Default | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--default | vérifié | 3/6 identiques, max 0.001 % | f4-ui-second-half-patterns |
| `components-statusicon--error` | Components/StatusIcon / Error | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--error | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusicon--all-statuses` | Components/StatusIcon / All Statuses | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--all-statuses | vérifié | 3/6 identiques, max 0.001 % | f4-ui-second-half-patterns |
| `components-statusicon--priorities` | Components/StatusIcon / Priorities | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--priorities | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-statusicon--many-items` | Components/StatusIcon / Many Items | stories/components/ui/status-icon.stories.tsx | gallery ?story=components-statusicon--many-items | vérifié | 3/6 identiques, max 0.001 % | f4-ui-second-half-patterns |
| `components-steplist--running` | Components/StepList / Running | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--running | écart identifié | 5/6 identiques, max 0.001 % | f4-ui-second-half-patterns |
| `components-steplist--starting` | Components/StepList / Starting | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--starting | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-steplist--done` | Components/StepList / Done | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--done | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-steplist--failed` | Components/StepList / Failed | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--failed | écart identifié | 0/6 identiques, max 0.143 % | f4-ui-second-half-patterns |
| `components-steplist--live` | Components/StepList / Live | stories/components/ui/step-list.stories.tsx | gallery ?story=components-steplist--live | écart identifié | 0/6 identiques, max 0.354 % | f4-ui-second-half-patterns |
| `components-table--default` | Components/Table / Default | stories/components/ui/table.stories.tsx | gallery ?story=components-table--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-table--with-footer` | Components/Table / With Footer | stories/components/ui/table.stories.tsx | gallery ?story=components-table--with-footer | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-table--selected` | Components/Table / Selected | stories/components/ui/table.stories.tsx | gallery ?story=components-table--selected | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-table--empty` | Components/Table / Empty | stories/components/ui/table.stories.tsx | gallery ?story=components-table--empty | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-table--long-text` | Components/Table / Long Text | stories/components/ui/table.stories.tsx | gallery ?story=components-table--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-table--many-items` | Components/Table / Many Items | stories/components/ui/table.stories.tsx | gallery ?story=components-table--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tabs--default` | Components/Tabs / Default | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tabs--small` | Components/Tabs / Small | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--small | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tabs--segmented-with-icons` | Components/Tabs / Segmented With Icons | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--segmented-with-icons | écart identifié | 3/6 identiques, max 0.002 % | f4-ui-second-half-patterns |
| `components-tabs--line` | Components/Tabs / Line | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--line | écart identifié | 3/6 identiques, max 0.002 % | f4-ui-second-half-patterns |
| `components-tabs--disabled` | Components/Tabs / Disabled | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--disabled | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tabs--long-text` | Components/Tabs / Long Text | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--long-text | écart identifié | 3/6 identiques, max 0.002 % | f4-ui-second-half-patterns |
| `components-tabs--many-items` | Components/Tabs / Many Items | stories/components/ui/tabs.stories.tsx | gallery ?story=components-tabs--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--default` | Components/Tag / Default | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--with-dot` | Components/Tag / With Dot | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--with-dot | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--no-hue` | Components/Tag / No Hue | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--no-hue | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--all-hues` | Components/Tag / All Hues | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--all-hues | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--every-theme` | Components/Tag / Every Theme | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--every-theme | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--label-marks` | Components/Tag / Label Marks | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--label-marks | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--dots` | Components/Tag / Dots | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--dots | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-tag--long-text` | Components/Tag / Long Text | stories/components/ui/tag.stories.tsx | gallery ?story=components-tag--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-textlink--default` | Components/TextLink / Default | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-textlink--muted` | Components/TextLink / Muted | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--muted | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-textlink--standalone-and-prose` | Components/TextLink / Standalone And Prose | stories/components/ui/text-link.stories.tsx | gallery ?story=components-textlink--standalone-and-prose | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-textarea--default` | Components/Textarea / Default | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-textarea--disabled` | Components/Textarea / Disabled | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-textarea--error` | Components/Textarea / Error | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--error | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-textarea--long-text` | Components/Textarea / Long Text | stories/components/ui/textarea.stories.tsx | gallery ?story=components-textarea--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toast--default` | Components/Toast / Default | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-toast--open` | Components/Toast / Open | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--open | vérifié | 0/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-toast--error` | Components/Toast / Error | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--error | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-toast--loading` | Components/Toast / Loading | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--loading | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-toast--many-items` | Components/Toast / Many Items | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--many-items | vérifié | 0/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-toast--long-text` | Components/Toast / Long Text | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--long-text | écart identifié | 0/6 identiques, max 3.407 % | f4-ui-second-half-patterns |
| `components-toast--composition` | Components/Toast / Composition | stories/components/ui/toast.stories.tsx | gallery ?story=components-toast--composition | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-togglegroup--default` | Components/ToggleGroup / Default | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--outline` | Components/ToggleGroup / Outline | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--outline | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--joined` | Components/ToggleGroup / Joined | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--joined | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--vertical` | Components/ToggleGroup / Vertical | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--vertical | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--disabled` | Components/ToggleGroup / Disabled | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--multiple` | Components/ToggleGroup / Multiple | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--multiple | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-togglegroup--with-text` | Components/ToggleGroup / With Text | stories/components/ui/toggle-group.stories.tsx | gallery ?story=components-togglegroup--with-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--default` | Components/Toggle / Default | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--default | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--pressed` | Components/Toggle / Pressed | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--pressed | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--outline` | Components/Toggle / Outline | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--outline | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--disabled` | Components/Toggle / Disabled | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--disabled | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--with-icon` | Components/Toggle / With Icon | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--with-icon | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--sizes` | Components/Toggle / Sizes | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--sizes | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-toggle--long-text` | Components/Toggle / Long Text | stories/components/ui/toggle.stories.tsx | gallery ?story=components-toggle--long-text | vérifié | 6/6 identiques, max 0.000 % | f1-primitives-forms |
| `components-uploadicon--default` | Components/UploadIcon / Default | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-uploadicon--sizes` | Components/UploadIcon / Sizes | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `components-uploadicon--driven-by-parent` | Components/UploadIcon / Driven By Parent | stories/components/ui/upload-icon.stories.tsx | gallery ?story=components-uploadicon--driven-by-parent | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-terminalcommandinput--idle` | Patterns/TerminalCommandInput / Idle | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--idle | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalcommandinput--busy` | Patterns/TerminalCommandInput / Busy | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--busy | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalcommandinput--raw-mode` | Patterns/TerminalCommandInput / Raw Mode | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--raw-mode | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalcommandinput--with-status` | Patterns/TerminalCommandInput / With Status | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--with-status | vérifié | 4/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalcommandinput--suggestions` | Patterns/TerminalCommandInput / Suggestions | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--suggestions | vérifié | 4/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalcommandinput--narrow-status` | Patterns/TerminalCommandInput / Narrow Status | stories/components/code-surface/command-input.stories.tsx | gallery ?story=patterns-terminalcommandinput--narrow-status | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-commandsuggestions--default` | Patterns/CommandSuggestions / Default | stories/components/code-surface/command-suggestions.stories.tsx | gallery ?story=patterns-commandsuggestions--default | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorbreadcrumbs--short` | Patterns/EditorBreadcrumbs / Short | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--short | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorbreadcrumbs--collapsed` | Patterns/EditorBreadcrumbs / Collapsed | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--collapsed | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorbreadcrumbs--clickable` | Patterns/EditorBreadcrumbs / Clickable | stories/components/code-surface/editor-breadcrumbs.stories.tsx | gallery ?story=patterns-editorbreadcrumbs--clickable | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorframe--default` | Patterns/EditorFrame / Default | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--default | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--dirty` | Patterns/EditorFrame / Dirty | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--dirty | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--disk-changed` | Patterns/EditorFrame / Disk Changed | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--disk-changed | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--markdown-toggle` | Patterns/EditorFrame / Markdown Toggle | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--markdown-toggle | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorframe--with-find` | Patterns/EditorFrame / With Find | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--with-find | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--with-replace` | Patterns/EditorFrame / With Replace | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--with-replace | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--long-path` | Patterns/EditorFrame / Long Path | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--long-path | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorframe--phone` | Patterns/EditorFrame / Phone | stories/components/code-surface/editor-frame.stories.tsx | gallery ?story=patterns-editorframe--phone | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorpreview--all-syntax-roles` | Patterns/EditorPreview / All Syntax Roles | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--all-syntax-roles | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorpreview--gutter` | Patterns/EditorPreview / Gutter | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--gutter | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorpreview--selection-and-matches` | Patterns/EditorPreview / Selection And Matches | stories/components/code-surface/editor-preview.stories.tsx | gallery ?story=patterns-editorpreview--selection-and-matches | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorstatusbar--default` | Patterns/EditorStatusBar / Default | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--default | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-editorstatusbar--selection` | Patterns/EditorStatusBar / Selection | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--selection | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-editorstatusbar--clickable` | Patterns/EditorStatusBar / Clickable | stories/components/code-surface/editor-status-bar.stories.tsx | gallery ?story=patterns-editorstatusbar--clickable | écart identifié | 3/6 identiques, max 0.004 % | f6-canvas-code |
| `patterns-findbar--matches` | Patterns/FindBar / Matches | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--matches | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-findbar--no-results` | Patterns/FindBar / No Results | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--no-results | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-findbar--invalid-regex` | Patterns/FindBar / Invalid Regex | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--invalid-regex | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-findbar--replace` | Patterns/FindBar / Replace | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--replace | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-findbar--find-only` | Patterns/FindBar / Find Only | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--find-only | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-findbar--select-all` | Patterns/FindBar / Select All | stories/components/code-surface/find-bar.stories.tsx | gallery ?story=patterns-findbar--select-all | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--running` | Patterns/TerminalBlock / Running | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--running | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--succeeded` | Patterns/TerminalBlock / Succeeded | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--succeeded | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--failed` | Patterns/TerminalBlock / Failed | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--failed | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--collapsed` | Patterns/TerminalBlock / Collapsed | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--collapsed | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--no-header` | Patterns/TerminalBlock / No Header | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--no-header | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--ansi-colours` | Patterns/TerminalBlock / Ansi Colours | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--ansi-colours | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--hidden-lines` | Patterns/TerminalBlock / Hidden Lines | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--hidden-lines | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--large-output-badge` | Patterns/TerminalBlock / Large Output Badge | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--large-output-badge | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--password-prompt` | Patterns/TerminalBlock / Password Prompt | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--password-prompt | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--long-output` | Patterns/TerminalBlock / Long Output | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--long-output | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--from-tool-call` | Patterns/TerminalBlock / From Tool Call | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--from-tool-call | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--session` | Patterns/TerminalBlock / Session | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--session | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--styled-runs` | Patterns/TerminalBlock / Styled Runs | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--styled-runs | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--links` | Patterns/TerminalBlock / Links | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--links | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--search-highlight` | Patterns/TerminalBlock / Search Highlight | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--search-highlight | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--inverse` | Patterns/TerminalBlock / Inverse | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--inverse | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--memoised-lines` | Patterns/TerminalBlock / Memoised Lines | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--memoised-lines | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalblock--command-highlight` | Patterns/TerminalBlock / Command Highlight | stories/components/code-surface/terminal-block.stories.tsx | gallery ?story=patterns-terminalblock--command-highlight | vérifié | 0/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalpalette--default` | Patterns/TerminalPalette / Default | stories/components/code-surface/terminal-palette.stories.tsx | gallery ?story=patterns-terminalpalette--default | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-terminalstopcontrol--ready` | Patterns/TerminalStopControl / Ready | stories/components/code-surface/terminal-stop-control.stories.tsx | gallery ?story=patterns-terminalstopcontrol--ready | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `patterns-commandpalette--default` | Patterns/CommandPalette / Default | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--filtered` | Patterns/CommandPalette / Filtered | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--filtered | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--with-recent` | Patterns/CommandPalette / With Recent | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--with-recent | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--nested-pages` | Patterns/CommandPalette / Nested Pages | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--nested-pages | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--disabled-items` | Patterns/CommandPalette / Disabled Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--disabled-items | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--loading` | Patterns/CommandPalette / Loading | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--loading | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--loading-with-results` | Patterns/CommandPalette / Loading With Results | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--loading-with-results | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--no-items` | Patterns/CommandPalette / No Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--no-items | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--no-matches` | Patterns/CommandPalette / No Matches | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--no-matches | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--long-labels` | Patterns/CommandPalette / Long Labels | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--long-labels | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--many-items` | Patterns/CommandPalette / Many Items | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--many-items | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--new-tab` | Patterns/CommandPalette / New Tab | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--new-tab | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--view-only` | Patterns/CommandPalette / View Only | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--view-only | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--inline-list` | Patterns/CommandPalette / Inline List | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--inline-list | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-commandpalette--rows` | Patterns/CommandPalette / Rows | stories/components/patterns/command-palette.stories.tsx | gallery ?story=patterns-commandpalette--rows | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-datatable--default` | Patterns/DataTable / Default | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--empty` | Patterns/DataTable / Empty | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--empty | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--many-items` | Patterns/DataTable / Many Items | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--bare` | Patterns/DataTable / Bare | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--bare | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--long-text` | Patterns/DataTable / Long Text | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--long-text | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--narrow` | Patterns/DataTable / Narrow | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--narrow | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-datatable--server-sorted` | Patterns/DataTable / Server Sorted | stories/components/patterns/data-table.stories.tsx | gallery ?story=patterns-datatable--server-sorted | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-dotmatrix--default` | Patterns/DotMatrix / Default | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--empty` | Patterns/DotMatrix / Empty | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--empty | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--with-gaps` | Patterns/DotMatrix / With Gaps | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--with-gaps | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--many-items` | Patterns/DotMatrix / Many Items | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--meter` | Patterns/DotMatrix / Meter | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--meter | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--gauge` | Patterns/DotMatrix / Gauge | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--gauge | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-dotmatrix--meter-hues` | Patterns/DotMatrix / Meter Hues | stories/components/patterns/dot-matrix.stories.tsx | gallery ?story=patterns-dotmatrix--meter-hues | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-hintoverlay--default` | Patterns/HintOverlay / Default | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-hintoverlay--open` | Patterns/HintOverlay / Open | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--open | écart identifié | 4/6 identiques, max 0.129 % | f2-overlays-menus |
| `patterns-hintoverlay--two-char-labels` | Patterns/HintOverlay / Two Char Labels | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--two-char-labels | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-hintoverlay--scrolled` | Patterns/HintOverlay / Scrolled | stories/components/patterns/hint-overlay.stories.tsx | gallery ?story=patterns-hintoverlay--scrolled | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-kpistrip--default` | Patterns/KpiStrip / Default | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--no-previous-period` | Patterns/KpiStrip / No Previous Period | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--no-previous-period | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--single` | Patterns/KpiStrip / Single | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--single | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--many-items` | Patterns/KpiStrip / Many Items | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--long-text` | Patterns/KpiStrip / Long Text | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--chips` | Patterns/KpiStrip / Chips | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--chips | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--tones` | Patterns/KpiStrip / Tones | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--tones | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-kpistrip--with-tones` | Patterns/KpiStrip / With Tones | stories/components/patterns/kpi-strip.stories.tsx | gallery ?story=patterns-kpistrip--with-tones | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-nextpage--scrolling` | Patterns/NextPage / Scrolling | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--scrolling | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-nextpage--fails-once` | Patterns/NextPage / Fails Once | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--fails-once | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-nextpage--loading` | Patterns/NextPage / Loading | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--loading | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-nextpage--failed` | Patterns/NextPage / Failed | stories/components/patterns/next-page.stories.tsx | gallery ?story=patterns-nextpage--failed | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--default` | Patterns/Panel / Default | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--untitled` | Patterns/Panel / Untitled | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--untitled | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--with-actions` | Patterns/Panel / With Actions | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--with-actions | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--empty` | Patterns/Panel / Empty | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--empty | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--long-text` | Patterns/Panel / Long Text | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-panel--stagger` | Patterns/Panel / Stagger | stories/components/patterns/panel.stories.tsx | gallery ?story=patterns-panel--stagger | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--default` | Patterns/PersonAvatar / Default | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--with-photo` | Patterns/PersonAvatar / With Photo | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--with-photo | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--error` | Patterns/PersonAvatar / Error | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--error | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--email-only` | Patterns/PersonAvatar / Email Only | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--email-only | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--sizes` | Patterns/PersonAvatar / Sizes | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--sizes | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-personavatar--long-text` | Patterns/PersonAvatar / Long Text | stories/components/patterns/person-avatar.stories.tsx | gallery ?story=patterns-personavatar--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-rail--default` | Patterns/Rail / Default | stories/components/patterns/rail.stories.tsx | gallery ?story=patterns-rail--default | vérifié | 0/6 identiques, max 0.001 % | f4-ui-second-half-patterns |
| `patterns-searchoverlay--default` | Patterns/SearchOverlay / Default | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--find-in-files-idle` | Patterns/SearchOverlay / Find In Files Idle | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-files-idle | écart identifié | 3/6 identiques, max 0.005 % | f2-overlays-menus |
| `patterns-searchoverlay--find-in-files-no-recents` | Patterns/SearchOverlay / Find In Files No Recents | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-files-no-recents | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--searching` | Patterns/SearchOverlay / Searching | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--searching | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--results` | Patterns/SearchOverlay / Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--results | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--no-results` | Patterns/SearchOverlay / No Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--no-results | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--failed` | Patterns/SearchOverlay / Failed | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--failed | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--find-in-chat` | Patterns/SearchOverlay / Find In Chat | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--find-in-chat | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--many-results` | Patterns/SearchOverlay / Many Results | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--many-results | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-searchoverlay--result-rows` | Patterns/SearchOverlay / Result Rows | stories/components/patterns/search-overlay.stories.tsx | gallery ?story=patterns-searchoverlay--result-rows | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `patterns-sectionheader--default` | Patterns/SectionHeader / Default | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-sectionheader--title-only` | Patterns/SectionHeader / Title Only | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--title-only | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-sectionheader--with-action` | Patterns/SectionHeader / With Action | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--with-action | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-sectionheader--with-icon` | Patterns/SectionHeader / With Icon | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--with-icon | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-sectionheader--long-text` | Patterns/SectionHeader / Long Text | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-sectionheader--page` | Patterns/SectionHeader / Page | stories/components/patterns/section-header.stories.tsx | gallery ?story=patterns-sectionheader--page | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-segmented--default` | Patterns/Segmented / Default | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--default | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-segmented--many-items` | Patterns/Segmented / Many Items | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--many-items | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-segmented--filters` | Patterns/Segmented / Filters | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--filters | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-segmented--icon-group` | Patterns/Segmented / Icon Group | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--icon-group | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-segmented--disabled` | Patterns/Segmented / Disabled | stories/components/patterns/segmented.stories.tsx | gallery ?story=patterns-segmented--disabled | vérifié | 6/6 identiques, max 0.000 % | f3-ui-first-half |
| `patterns-settingcard--default` | Patterns/SettingCard / Default | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-settingcard--disabled` | Patterns/SettingCard / Disabled | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--disabled | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-settingcard--long-text` | Patterns/SettingCard / Long Text | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-settingcard--many-items` | Patterns/SettingCard / Many Items | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--many-items | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-settingcard--narrow` | Patterns/SettingCard / Narrow | stories/components/patterns/setting-card.stories.tsx | gallery ?story=patterns-settingcard--narrow | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--default` | Patterns/StatCard / Default | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--default | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--with-badge` | Patterns/StatCard / With Badge | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--with-badge | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--empty` | Patterns/StatCard / Empty | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--empty | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--long-text` | Patterns/StatCard / Long Text | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--long-text | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--grid` | Patterns/StatCard / Grid | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--grid | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--meters` | Patterns/StatCard / Meters | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--meters | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `patterns-statcard--meter-no-hue` | Patterns/StatCard / Meter No Hue | stories/components/patterns/stat-card.stories.tsx | gallery ?story=patterns-statcard--meter-no-hue | vérifié | 6/6 identiques, max 0.000 % | f4-ui-second-half-patterns |
| `blocks-checkpointtrace--org-week` | Blocks/CheckpointTrace / Org Week | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--org-week | vérifié | 2/6 identiques, max 0.001 % | f8-blocks-foundations |
| `blocks-checkpointtrace--keyboard` | Blocks/CheckpointTrace / Keyboard | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--keyboard | écart identifié | 4/6 identiques, max 0.019 % | f8-blocks-foundations |
| `blocks-checkpointtrace--pan-and-zoom` | Blocks/CheckpointTrace / Pan And Zoom | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--pan-and-zoom | écart identifié | 4/6 identiques, max 0.110 % | f8-blocks-foundations |
| `blocks-checkpointtrace--project-day` | Blocks/CheckpointTrace / Project Day | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--project-day | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--live` | Blocks/CheckpointTrace / Live | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--live | écart identifié | 0/6 identiques, max 0.004 % | f8-blocks-foundations |
| `blocks-checkpointtrace--dense-clustering` | Blocks/CheckpointTrace / Dense Clustering | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--dense-clustering | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--group-by-person` | Blocks/CheckpointTrace / Group By Person | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--group-by-person | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--group-by-project` | Blocks/CheckpointTrace / Group By Project | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--group-by-project | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--empty` | Blocks/CheckpointTrace / Empty | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--empty | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--loading` | Blocks/CheckpointTrace / Loading | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--loading | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--error-state` | Blocks/CheckpointTrace / Error State | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--error-state | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--error-with-retry` | Blocks/CheckpointTrace / Error With Retry | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--error-with-retry | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--long-titles` | Blocks/CheckpointTrace / Long Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--long-titles | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--team-week` | Blocks/CheckpointTrace / Team Week | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--team-week | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--dense-clusters-with-titles` | Blocks/CheckpointTrace / Dense Clusters With Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--dense-clusters-with-titles | écart identifié | 2/6 identiques, max 0.003 % | f8-blocks-foundations |
| `blocks-checkpointtrace--mixed-titles` | Blocks/CheckpointTrace / Mixed Titles | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--mixed-titles | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--compact` | Blocks/CheckpointTrace / Compact | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--compact | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--many-sessions` | Blocks/CheckpointTrace / Many Sessions | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--many-sessions | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-checkpointtrace--placeholder-initials` | Blocks/CheckpointTrace / Placeholder Initials | stories/components/blocks/checkpoint-trace.stories.tsx | gallery ?story=blocks-checkpointtrace--placeholder-initials | vérifié | 2/6 identiques, max 0.001 % | f8-blocks-foundations |
| `blocks-dashedrails--default` | Blocks/DashedRails / Default | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-dashedrails--faded` | Blocks/DashedRails / Faded | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--faded | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-dashedrails--fixed-offset` | Blocks/DashedRails / Fixed Offset | stories/components/blocks/dashed-rails.stories.tsx | gallery ?story=blocks-dashedrails--fixed-offset | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-ghostcards--default` | Blocks/GhostCards / Default | stories/components/blocks/ghost-cards.stories.tsx | gallery ?story=blocks-ghostcards--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-ghostcards--long-text` | Blocks/GhostCards / Long Text | stories/components/blocks/ghost-cards.stories.tsx | gallery ?story=blocks-ghostcards--long-text | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-globe--default` | Blocks/Globe / Default | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-globe--empty` | Blocks/Globe / Empty | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--empty | écart identifié | 5/6 identiques, max 0.149 % | f8-blocks-foundations |
| `blocks-globe--still` | Blocks/Globe / Still | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--still | écart identifié | 0/6 identiques, max 0.521 % | f8-blocks-foundations |
| `blocks-globe--long-text` | Blocks/Globe / Long Text | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--long-text | écart identifié | 0/6 identiques, max 0.128 % | f8-blocks-foundations |
| `blocks-globe--no-webgl` | Blocks/Globe / No Webgl | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--no-webgl | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-globe--custom-fallback` | Blocks/Globe / Custom Fallback | stories/components/blocks/globe.stories.tsx | gallery ?story=blocks-globe--custom-fallback | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-gradualblur--bottom` | Blocks/GradualBlur / Bottom | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--bottom | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-gradualblur--top` | Blocks/GradualBlur / Top | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--top | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-gradualblur--tinted` | Blocks/GradualBlur / Tinted | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--tinted | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-gradualblur--off` | Blocks/GradualBlur / Off | stories/components/blocks/gradual-blur.stories.tsx | gallery ?story=blocks-gradualblur--off | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-infiniteslider--default` | Blocks/InfiniteSlider / Default | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--default | écart identifié | 5/6 identiques, max 0.003 % | f8-blocks-foundations |
| `blocks-infiniteslider--reverse` | Blocks/InfiniteSlider / Reverse | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--reverse | écart identifié | 5/6 identiques, max 0.007 % | f8-blocks-foundations |
| `blocks-infiniteslider--vertical` | Blocks/InfiniteSlider / Vertical | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--vertical | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-infiniteslider--many-items` | Blocks/InfiniteSlider / Many Items | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--many-items | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-infiniteslider--capped` | Blocks/InfiniteSlider / Capped | stories/components/blocks/infinite-slider.stories.tsx | gallery ?story=blocks-infiniteslider--capped | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-plusdecorator--default` | Blocks/PlusDecorator / Default | stories/components/blocks/plus-decorator.stories.tsx | gallery ?story=blocks-plusdecorator--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-plusdecorator--all-corners` | Blocks/PlusDecorator / All Corners | stories/components/blocks/plus-decorator.stories.tsx | gallery ?story=blocks-plusdecorator--all-corners | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-scrollrail--default` | Blocks/ScrollRail / Default | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--default | écart identifié | 0/6 identiques, max 0.018 % | f8-blocks-foundations |
| `blocks-scrollrail--halfway` | Blocks/ScrollRail / Halfway | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--halfway | écart identifié | 0/6 identiques, max 0.013 % | f8-blocks-foundations |
| `blocks-scrollrail--empty` | Blocks/ScrollRail / Empty | stories/components/blocks/scroll-rail.stories.tsx | gallery ?story=blocks-scrollrail--empty | écart identifié | 0/6 identiques, max 0.004 % | f8-blocks-foundations |
| `blocks-timelinecalendar--default` | Blocks/TimelineCalendar / Default | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--default | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-timelinecalendar--empty` | Blocks/TimelineCalendar / Empty | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--empty | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-timelinecalendar--long-text` | Blocks/TimelineCalendar / Long Text | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--long-text | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-timelinecalendar--many-items` | Blocks/TimelineCalendar / Many Items | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--many-items | vérifié | 4/6 identiques, max 0.001 % | f8-blocks-foundations |
| `blocks-timelinecalendar--scrolled` | Blocks/TimelineCalendar / Scrolled | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--scrolled | écart identifié | 3/6 identiques, max 0.006 % | f8-blocks-foundations |
| `blocks-timelinecalendar--flush` | Blocks/TimelineCalendar / Flush | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--flush | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-timelinecalendar--scrolled-to-end` | Blocks/TimelineCalendar / Scrolled To End | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--scrolled-to-end | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-timelinecalendar--measured-end` | Blocks/TimelineCalendar / Measured End | stories/components/blocks/timeline-calendar.stories.tsx | gallery ?story=blocks-timelinecalendar--measured-end | vérifié | 6/6 identiques, max 0.000 % | f8-blocks-foundations |
| `blocks-canvas-action-pill--alone` | Blocks/Canvas action pill / Alone | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--alone | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-action-pill--three-peers` | Blocks/Canvas action pill / Three Peers | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--three-peers | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-action-pill--overflow` | Blocks/Canvas action pill / Overflow | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--overflow | écart identifié | 5/6 identiques, max 0.018 % | f6-canvas-code |
| `blocks-canvas-action-pill--following` | Blocks/Canvas action pill / Following | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--following | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-action-pill--followed-by` | Blocks/Canvas action pill / Followed By | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--followed-by | écart identifié | 4/6 identiques, max 0.033 % | f6-canvas-code |
| `blocks-canvas-action-pill--exporting` | Blocks/Canvas action pill / Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--exporting | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-action-pill--export-labelled` | Blocks/Canvas action pill / Export Labelled | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-labelled | écart identifié | 4/6 identiques, max 0.022 % | f6-canvas-code |
| `blocks-canvas-action-pill--export-labelled-exporting` | Blocks/Canvas action pill / Export Labelled Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-labelled-exporting | écart identifié | 3/6 identiques, max 0.026 % | f6-canvas-code |
| `blocks-canvas-action-pill--export-only` | Blocks/Canvas action pill / Export Only | stories/components/canvas/canvas-action-pill.stories.tsx | gallery ?story=blocks-canvas-action-pill--export-only | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-board--spaces` | Blocks/Canvas board / Spaces | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--spaces | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-board--local-canvas` | Blocks/Canvas board / Local Canvas | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--local-canvas | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-board--empty-page` | Blocks/Canvas board / Empty Page | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--empty-page | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-board--phone` | Blocks/Canvas board / Phone | stories/components/canvas/canvas-board.stories.tsx | gallery ?story=blocks-canvas-board--phone | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-chrome--pieces` | Blocks/Canvas chrome / Pieces | stories/components/canvas/canvas-chrome.stories.tsx | gallery ?story=blocks-canvas-chrome--pieces | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--live` | Blocks/Canvas header / Live | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--live | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--syncing` | Blocks/Canvas header / Syncing | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--syncing | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--offline` | Blocks/Canvas header / Offline | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--offline | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--offline-error` | Blocks/Canvas header / Offline Error | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--offline-error | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--archived` | Blocks/Canvas header / Archived | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--archived | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--viewing` | Blocks/Canvas header / Viewing | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--viewing | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--local-canvas` | Blocks/Canvas header / Local Canvas | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--local-canvas | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--long-page-name` | Blocks/Canvas header / Long Page Name | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--long-page-name | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--page-switcher` | Blocks/Canvas header / Page Switcher | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--page-switcher | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-header--page-switcher-empty` | Blocks/Canvas header / Page Switcher Empty | stories/components/canvas/canvas-header-pill.stories.tsx | gallery ?story=blocks-canvas-header--page-switcher-empty | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-minimap--default` | Blocks/Canvas minimap / Default | stories/components/canvas/canvas-minimap.stories.tsx | gallery ?story=blocks-canvas-minimap--default | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-minimap--empty` | Blocks/Canvas minimap / Empty | stories/components/canvas/canvas-minimap.stories.tsx | gallery ?story=blocks-canvas-minimap--empty | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--note` | Blocks/Canvas nodes / Note | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--note-empty` | Blocks/Canvas nodes / Note Empty | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-empty | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--note-selected` | Blocks/Canvas nodes / Note Selected | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-selected | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--note-claimed` | Blocks/Canvas nodes / Note Claimed | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-claimed | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--note-editing` | Blocks/Canvas nodes / Note Editing | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--note-editing | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--text` | Blocks/Canvas nodes / Text | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--text | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--shapes` | Blocks/Canvas nodes / Shapes | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--shapes | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--frame` | Blocks/Canvas nodes / Frame | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--frame | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--media-loading` | Blocks/Canvas nodes / Media Loading | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-loading | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--media-loading-labelled` | Blocks/Canvas nodes / Media Loading Labelled | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-loading-labelled | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--media-error` | Blocks/Canvas nodes / Media Error | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-error | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--media-image` | Blocks/Canvas nodes / Media Image | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--media-image | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-nodes--selected-with-anchors` | Blocks/Canvas nodes / Selected With Anchors | stories/components/canvas/canvas-nodes.stories.tsx | gallery ?story=blocks-canvas-nodes--selected-with-anchors | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--flat` | Blocks/Canvas pages panel / Flat | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--flat | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--with-folders` | Blocks/Canvas pages panel / With Folders | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-folders | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--collapsed` | Blocks/Canvas pages panel / Collapsed | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--collapsed | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--single-page` | Blocks/Canvas pages panel / Single Page | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--single-page | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--empty` | Blocks/Canvas pages panel / Empty | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--empty | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--long-names` | Blocks/Canvas pages panel / Long Names | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--long-names | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--drop-indicator-before` | Blocks/Canvas pages panel / Drop Indicator Before | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-before | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--drop-indicator-after` | Blocks/Canvas pages panel / Drop Indicator After | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-after | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--drop-indicator-into` | Blocks/Canvas pages panel / Drop Indicator Into | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--drop-indicator-into | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--with-back-link` | Blocks/Canvas pages panel / With Back Link | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-back-link | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--rename` | Blocks/Canvas pages panel / Rename | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--rename | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--with-authors` | Blocks/Canvas pages panel / With Authors | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--with-authors | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--row-actions` | Blocks/Canvas pages panel / Row Actions | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--row-actions | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--delete-always` | Blocks/Canvas pages panel / Delete Always | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--delete-always-last-page` | Blocks/Canvas pages panel / Delete Always Last Page | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always-last-page | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--delete-always-last-page-label` | Blocks/Canvas pages panel / Delete Always Last Page Label | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--delete-always-last-page-label | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--spaces-full` | Blocks/Canvas pages panel / Spaces Full | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--spaces-full | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-pages-panel--row-action-click` | Blocks/Canvas pages panel / Row Action Click | stories/components/canvas/canvas-pages-panel.stories.tsx | gallery ?story=blocks-canvas-pages-panel--row-action-click | écart identifié | 0/6 identiques, max 0.159 % | f6-canvas-code |
| `blocks-canvas-toolbar--spaces-bottom` | Blocks/Canvas toolbar / Spaces Bottom | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-bottom | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--spaces-left` | Blocks/Canvas toolbar / Spaces Left | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-left | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--spaces-right` | Blocks/Canvas toolbar / Spaces Right | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--spaces-right | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--local-canvas` | Blocks/Canvas toolbar / Local Canvas | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--local-canvas | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--history-unavailable` | Blocks/Canvas toolbar / History Unavailable | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--history-unavailable | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--disabled` | Blocks/Canvas toolbar / Disabled | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--disabled | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-canvas-toolbar--tool-armed` | Blocks/Canvas toolbar / Tool Armed | stories/components/canvas/canvas-toolbar.stories.tsx | gallery ?story=blocks-canvas-toolbar--tool-armed | écart identifié | 2/6 identiques, max 0.025 % | f6-canvas-code |
| `blocks-presence-cursor--all-hues` | Blocks/Presence cursor / All Hues | stories/components/canvas/presence-cursor.stories.tsx | gallery ?story=blocks-presence-cursor--all-hues | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-presence-cursor--long-name` | Blocks/Presence cursor / Long Name | stories/components/canvas/presence-cursor.stories.tsx | gallery ?story=blocks-presence-cursor--long-name | vérifié | 6/6 identiques, max 0.000 % | f6-canvas-code |
| `blocks-comms-composershell--empty` | Blocks/Comms/ComposerShell / Empty | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--empty | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--can-send` | Blocks/Comms/ComposerShell / Can Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--can-send | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--sending` | Blocks/Comms/ComposerShell / Sending | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--sending | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--replying` | Blocks/Comms/ComposerShell / Replying | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--replying | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--replying-to-deleted` | Blocks/Comms/ComposerShell / Replying To Deleted | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--replying-to-deleted | écart identifié | 5/6 identiques, max 0.005 % | f7-session-comms |
| `blocks-comms-composershell--editing` | Blocks/Comms/ComposerShell / Editing | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--editing | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--with-attachments` | Blocks/Comms/ComposerShell / With Attachments | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--with-attachments | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--read-only` | Blocks/Comms/ComposerShell / Read Only | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--read-only | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--custom-send` | Blocks/Comms/ComposerShell / Custom Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--custom-send | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--format-row` | Blocks/Comms/ComposerShell / Format Row | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--format-row | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--drop-active` | Blocks/Comms/ComposerShell / Drop Active | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--drop-active | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--invalid` | Blocks/Comms/ComposerShell / Invalid | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--invalid | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--with-popup` | Blocks/Comms/ComposerShell / With Popup | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--with-popup | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--editing-with-preview` | Blocks/Comms/ComposerShell / Editing With Preview | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--editing-with-preview | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--render-send` | Blocks/Comms/ComposerShell / Render Send | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--render-send | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-composershell--custom-send-label` | Blocks/Comms/ComposerShell / Custom Send Label | stories/components/comms/comms-composer-shell.stories.tsx | gallery ?story=blocks-comms-composershell--custom-send-label | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--channel` | Blocks/Comms/ConversationRow / Channel | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--channel | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--private-channel` | Blocks/Comms/ConversationRow / Private Channel | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--private-channel | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--selected` | Blocks/Comms/ConversationRow / Selected | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--selected | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--unread` | Blocks/Comms/ConversationRow / Unread | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--unread | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--mentions` | Blocks/Comms/ConversationRow / Mentions | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--mentions | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--many-unread` | Blocks/Comms/ConversationRow / Many Unread | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--many-unread | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--direct-message-online` | Blocks/Comms/ConversationRow / Direct Message Online | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--direct-message-online | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--direct-message-offline` | Blocks/Comms/ConversationRow / Direct Message Offline | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--direct-message-offline | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--group` | Blocks/Comms/ConversationRow / Group | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--group | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--archived` | Blocks/Comms/ConversationRow / Archived | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--archived | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--long-name` | Blocks/Comms/ConversationRow / Long Name | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--long-name | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--list` | Blocks/Comms/ConversationRow / List | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--list | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-conversationrow--disabled-row` | Blocks/Comms/ConversationRow / Disabled Row | stories/components/comms/comms-conversation-row.stories.tsx | gallery ?story=blocks-comms-conversationrow--disabled-row | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--head` | Blocks/Comms/MessageRow / Head | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--head | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--continuation` | Blocks/Comms/MessageRow / Continuation | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--continuation | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--reply` | Blocks/Comms/MessageRow / Reply | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--reply-to-deleted` | Blocks/Comms/MessageRow / Reply To Deleted | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply-to-deleted | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--reply-missing` | Blocks/Comms/MessageRow / Reply Missing | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reply-missing | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--reactions` | Blocks/Comms/MessageRow / Reactions | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--reactions | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--pinned` | Blocks/Comms/MessageRow / Pinned | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--pinned | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--edited` | Blocks/Comms/MessageRow / Edited | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--edited | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--sending` | Blocks/Comms/MessageRow / Sending | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--sending | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--failed` | Blocks/Comms/MessageRow / Failed | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--failed | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--deleted` | Blocks/Comms/MessageRow / Deleted | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--deleted | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--integration` | Blocks/Comms/MessageRow / Integration | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--integration | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--integration-via` | Blocks/Comms/MessageRow / Integration Via | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--integration-via | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--editing` | Blocks/Comms/MessageRow / Editing | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--editing | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--with-attachments` | Blocks/Comms/MessageRow / With Attachments | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--with-attachments | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--long-name` | Blocks/Comms/MessageRow / Long Name | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--long-name | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--toolbar-on-focus` | Blocks/Comms/MessageRow / Toolbar On Focus | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--toolbar-on-focus | écart identifié | 3/6 identiques, max 0.002 % | f7-session-comms |
| `blocks-comms-messagerow--author-name-slot` | Blocks/Comms/MessageRow / Author Name Slot | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--author-name-slot | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--custom-labels` | Blocks/Comms/MessageRow / Custom Labels | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--custom-labels | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--transcript` | Blocks/Comms/MessageRow / Transcript | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--transcript | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `blocks-comms-messagerow--unread-line-label` | Blocks/Comms/MessageRow / Unread Line Label | stories/components/comms/comms-message-row.stories.tsx | gallery ?story=blocks-comms-messagerow--unread-line-label | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessionpipeline--plan-steps` | Session/SessionPipeline / Plan Steps | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--plan-steps | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessionpipeline--tool-steps` | Session/SessionPipeline / Tool Steps | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--tool-steps | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessionpipeline--empty` | Session/SessionPipeline / Empty | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--empty | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessionpipeline--long-text` | Session/SessionPipeline / Long Text | stories/components/session/session-pipeline.stories.tsx | gallery ?story=session-sessionpipeline--long-text | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--long` | Session/SessionTimeline / Long | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--long | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--streaming` | Session/SessionTimeline / Streaming | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--streaming | écart identifié | 0/6 identiques, max 0.003 % | f7-session-comms |
| `session-sessiontimeline--errored` | Session/SessionTimeline / Errored | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--errored | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--disconnected` | Session/SessionTimeline / Disconnected | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--disconnected | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--cancelled` | Session/SessionTimeline / Cancelled | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--cancelled | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--many-tool-calls` | Session/SessionTimeline / Many Tool Calls | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--many-tool-calls | vérifié | 0/6 identiques, max 0.001 % | f7-session-comms |
| `session-sessiontimeline--huge-output` | Session/SessionTimeline / Huge Output | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--huge-output | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--live-from-the-bottom` | Session/SessionTimeline / Live From The Bottom | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--live-from-the-bottom | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--web-shaped` | Session/SessionTimeline / Web Shaped | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--web-shaped | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-sessiontimeline--without-heading` | Session/SessionTimeline / Without Heading | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--without-heading | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-sessiontimeline--agent-mark` | Session/SessionTimeline / Agent Mark | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--agent-mark | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--author-face` | Session/SessionTimeline / Author Face | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--author-face | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--phone` | Session/SessionTimeline / Phone | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--phone | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--deep-link-to-folded-call` | Session/SessionTimeline / Deep Link To Folded Call | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--deep-link-to-folded-call | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--read-the-rest` | Session/SessionTimeline / Read The Rest | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--read-the-rest | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--deep-link-then-close` | Session/SessionTimeline / Deep Link Then Close | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--deep-link-then-close | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-sessiontimeline--reveal-item` | Session/SessionTimeline / Reveal Item | stories/components/session/session-timeline.stories.tsx | gallery ?story=session-sessiontimeline--reveal-item | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-streamingmarkdown--static` | Session/StreamingMarkdown / Static | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--static | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-streamingmarkdown--streaming` | Session/StreamingMarkdown / Streaming | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--streaming | écart identifié | 0/6 identiques, max 0.950 % | f7-session-comms |
| `session-streamingmarkdown--long` | Session/StreamingMarkdown / Long | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--long | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-streamingmarkdown--untrusted-input` | Session/StreamingMarkdown / Untrusted Input | stories/components/session/streaming-markdown.stories.tsx | gallery ?story=session-streamingmarkdown--untrusted-input | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--default` | Session/ToolCallCard / Default | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--default | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--statuses` | Session/ToolCallCard / Statuses | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--statuses | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--diff` | Session/ToolCallCard / Diff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--diff | écart identifié | 0/6 identiques, max 0.002 % | f7-session-comms |
| `session-toolcallcard--new-file` | Session/ToolCallCard / New File | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--new-file | écart identifié | 0/6 identiques, max 0.002 % | f7-session-comms |
| `session-toolcallcard--terminal` | Session/ToolCallCard / Terminal | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--terminal | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--truncated-payload` | Session/ToolCallCard / Truncated Payload | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--truncated-payload-loading` | Session/ToolCallCard / Truncated Payload Loading | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload-loading | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--truncated-payload-states` | Session/ToolCallCard / Truncated Payload States | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--truncated-payload-states | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--binary` | Session/ToolCallCard / Binary | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--binary | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--empty` | Session/ToolCallCard / Empty | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--empty | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--long-title` | Session/ToolCallCard / Long Title | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--long-title | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--huge-output` | Session/ToolCallCard / Huge Output | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--huge-output | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--huge-diff` | Session/ToolCallCard / Huge Diff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--huge-diff | écart identifié | 0/6 identiques, max 0.002 % | f7-session-comms |
| `session-toolcallcard--default-diff-alone` | Session/ToolCallCard / DefaultDiff | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--default-diff-alone | vérifié | 0/6 identiques, max 0.001 % | f7-session-comms |
| `session-toolcallcard--copy-payloads` | Session/ToolCallCard / Copy Payloads | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--copy-payloads | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-toolcallcard--custom-labels` | Session/ToolCallCard / Custom Labels | stories/components/session/tool-call-card.stories.tsx | gallery ?story=session-toolcallcard--custom-labels | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--user-and-answer` | Session/TurnRow / User And Answer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--user-and-answer | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--streaming` | Session/TurnRow / Streaming | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--streaming | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--with-attachments` | Session/TurnRow / With Attachments | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-attachments | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--long-prompt` | Session/TurnRow / Long Prompt | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--long-prompt | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--clamped-response` | Session/TurnRow / Clamped Response | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--clamped-response | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--run-file-summary` | Session/TurnRow / Run File Summary | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--run-file-summary | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--with-thinking` | Session/TurnRow / With Thinking | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-thinking | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--with-plan` | Session/TurnRow / With Plan | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-plan | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--with-checkpoint` | Session/TurnRow / With Checkpoint | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--with-checkpoint | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--failed` | Session/TurnRow / Failed | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--failed | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--failed-other` | Session/TurnRow / Failed Other | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--failed-other | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--cancelled` | Session/TurnRow / Cancelled | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--cancelled | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--retrying` | Session/TurnRow / Retrying | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--retrying | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--many-tool-calls` | Session/TurnRow / Many Tool Calls | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--many-tool-calls | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--item-footer` | Session/TurnRow / Item Footer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--item-footer | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--checkpoint-footer` | Session/TurnRow / Checkpoint Footer | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--checkpoint-footer | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--controlled-open-tool-call` | Session/TurnRow / Controlled Open Tool Call | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--controlled-open-tool-call | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--plain-thinking` | Session/TurnRow / Plain Thinking | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--plain-thinking | vérifié | 3/6 identiques, max 0.001 % | f7-session-comms |
| `session-turnrow--openable-attachments` | Session/TurnRow / Openable Attachments | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--openable-attachments | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--read-the-rest` | Session/TurnRow / Read The Rest | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--read-the-rest-failed` | Session/TurnRow / Read The Rest Failed | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest-failed | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--read-the-rest-states` | Session/TurnRow / Read The Rest States | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--read-the-rest-states | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `session-turnrow--controlled-tool-run` | Session/TurnRow / Controlled Tool Run | stories/components/session/turn-row.stories.tsx | gallery ?story=session-turnrow--controlled-tool-run | vérifié | 6/6 identiques, max 0.000 % | f7-session-comms |
| `shell-appshell--default` | Shell/AppShell / Default | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--default | écart identifié | 1/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-appshell--with-dock` | Shell/AppShell / With Dock | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--with-dock | vérifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-appshell--collapsed` | Shell/AppShell / Collapsed | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--collapsed | écart identifié | 0/6 identiques, max 0.050 % | f5-layout-shell |
| `shell-appshell--light` | Shell/AppShell / Light | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--light | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-appshell--empty` | Shell/AppShell / Empty | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--empty | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-appshell--many-items` | Shell/AppShell / Many Items | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--many-items | écart identifié | 0/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-appshell--command-open` | Shell/AppShell / Command Open | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--command-open | écart identifié | 0/6 identiques, max 0.005 % | f5-layout-shell |
| `shell-appshell--phone` | Shell/AppShell / Phone | stories/components/shell/app-shell.stories.tsx | gallery ?story=shell-appshell--phone | vérifié | 1/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-authsplit--default` | Shell/AuthSplit / Default | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--default | écart identifié | 5/6 identiques, max 0.724 % | f5-layout-shell |
| `shell-authsplit--loading` | Shell/AuthSplit / Loading | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--loading | écart identifié | 5/6 identiques, max 0.822 % | f5-layout-shell |
| `shell-authsplit--error-state` | Shell/AuthSplit / Error | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--error-state | écart identifié | 5/6 identiques, max 0.952 % | f5-layout-shell |
| `shell-authsplit--without-proof` | Shell/AuthSplit / Without Proof | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--without-proof | écart identifié | 5/6 identiques, max 0.846 % | f5-layout-shell |
| `shell-authsplit--long-text` | Shell/AuthSplit / Long Text | stories/components/shell/auth-split.stories.tsx | gallery ?story=shell-authsplit--long-text | écart identifié | 4/6 identiques, max 0.846 % | f5-layout-shell |
| `shell-commandmenu--default` | Shell/CommandMenu / Default | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--default | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-commandmenu--open` | Shell/CommandMenu / Open | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--open | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-commandmenu--filtered` | Shell/CommandMenu / Filtered | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--filtered | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-commandmenu--empty` | Shell/CommandMenu / Empty | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--empty | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-commandmenu--many-items` | Shell/CommandMenu / Many Items | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--many-items | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-commandmenu--long-text` | Shell/CommandMenu / Long Text | stories/components/shell/command-menu.stories.tsx | gallery ?story=shell-commandmenu--long-text | vérifié | 6/6 identiques, max 0.000 % | f2-overlays-menus |
| `shell-listdetail--default` | Shell/ListDetail / Default | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--default | vérifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-listdetail--wide` | Shell/ListDetail / Wide | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--wide | vérifié | 3/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-listdetail--empty` | Shell/ListDetail / Empty | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--empty | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-listdetail--long-text` | Shell/ListDetail / Long Text | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--long-text | vérifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-listdetail--many-items` | Shell/ListDetail / Many Items | stories/components/shell/list-detail.stories.tsx | gallery ?story=shell-listdetail--many-items | écart identifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-orgswitcher--default` | Shell/OrgSwitcher / Default | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--default | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-orgswitcher--open` | Shell/OrgSwitcher / Open | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--open | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-orgswitcher--switch-workspace` | Shell/OrgSwitcher / Switch Workspace | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--switch-workspace | écart identifié | 0/6 identiques, max 0.024 % | f5-layout-shell |
| `shell-orgswitcher--collapsed` | Shell/OrgSwitcher / Collapsed | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--collapsed | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-orgswitcher--long-text` | Shell/OrgSwitcher / Long Text | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--long-text | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-orgswitcher--many-items` | Shell/OrgSwitcher / Many Items | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--many-items | écart identifié | 0/6 identiques, max 0.024 % | f5-layout-shell |
| `shell-orgswitcher--mark` | Shell/OrgSwitcher / Mark | stories/components/shell/org-switcher.stories.tsx | gallery ?story=shell-orgswitcher--mark | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-settingsshell--default` | Shell/SettingsShell / Default | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--default | écart identifié | 0/6 identiques, max 0.022 % | f5-layout-shell |
| `shell-settingsshell--empty` | Shell/SettingsShell / Empty | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--empty | écart identifié | 0/6 identiques, max 0.009 % | f5-layout-shell |
| `shell-settingsshell--long-text` | Shell/SettingsShell / Long Text | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--long-text | écart identifié | 0/6 identiques, max 0.022 % | f5-layout-shell |
| `shell-settingsshell--many-items` | Shell/SettingsShell / Many Items | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--many-items | écart identifié | 0/6 identiques, max 0.059 % | f5-layout-shell |
| `shell-settingsshell--rail` | Shell/SettingsShell / Rail | stories/components/shell/settings-shell.stories.tsx | gallery ?story=shell-settingsshell--rail | écart identifié | 0/6 identiques, max 0.013 % | f5-layout-shell |
| `shell-sidebarcontrols--default` | Shell/SidebarControls / Default | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--default | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-sidebarcontrols--profile-open` | Shell/SidebarControls / Profile Open | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--profile-open | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-sidebarcontrols--info-open` | Shell/SidebarControls / Info Open | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--info-open | écart identifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-sidebarcontrols--info-few-links` | Shell/SidebarControls / Info Few Links | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--info-few-links | écart identifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-sidebarcontrols--long-text` | Shell/SidebarControls / Long Text | stories/components/shell/sidebar-controls.stories.tsx | gallery ?story=shell-sidebarcontrols--long-text | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-sidebar--default` | Shell/Sidebar / Default | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--default | vérifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-sidebar--collapsed` | Shell/Sidebar / Collapsed | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--collapsed | écart identifié | 0/6 identiques, max 0.192 % | f5-layout-shell |
| `shell-sidebar--child-active` | Shell/Sidebar / Child Active | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--child-active | écart identifié | 0/6 identiques, max 0.003 % | f5-layout-shell |
| `shell-sidebar--empty` | Shell/Sidebar / Empty | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--empty | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-sidebar--long-text` | Shell/Sidebar / Long Text | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--long-text | vérifié | 3/6 identiques, max 0.001 % | f5-layout-shell |
| `shell-sidebar--many-items` | Shell/Sidebar / Many Items | stories/components/shell/sidebar.stories.tsx | gallery ?story=shell-sidebar--many-items | écart identifié | 0/6 identiques, max 0.003 % | f5-layout-shell |
| `shell-uiscale--default` | Shell/UiScale / Default | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--default | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-uiscale--open` | Shell/UiScale / Open | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--open | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-uiscale--icon-only` | Shell/UiScale / Icon Only | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--icon-only | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-uiscale--at-minimum` | Shell/UiScale / At Minimum | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--at-minimum | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-uiscale--panel` | Shell/UiScale / Panel | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--panel | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `shell-uiscale--with-shortcuts` | Shell/UiScale / With Shortcuts | stories/components/shell/ui-scale.stories.tsx | gallery ?story=shell-uiscale--with-shortcuts | écart identifié | 0/6 identiques, max 0.265 % | f5-layout-shell |
| `layout-appframe--default` | Layout/AppFrame / Default | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--default | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `layout-appframe--with-dock` | Layout/AppFrame / With Dock | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--with-dock | écart identifié | 4/6 identiques, max 0.001 % | f5-layout-shell |
| `layout-appframe--half-dock` | Layout/AppFrame / Half Dock | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--half-dock | écart identifié | 4/6 identiques, max 0.004 % | f5-layout-shell |
| `layout-appframe--empty` | Layout/AppFrame / Empty | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--empty | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `layout-appframe--light` | Layout/AppFrame / Light | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--light | écart identifié | 4/6 identiques, max 0.001 % | f5-layout-shell |
| `layout-appframe--titlebar-inset` | Layout/AppFrame / Titlebar Inset | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--titlebar-inset | écart identifié | 4/6 identiques, max 0.001 % | f5-layout-shell |
| `layout-appframe--phone` | Layout/AppFrame / Phone | stories/components/layout/app-frame.stories.tsx | gallery ?story=layout-appframe--phone | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `layout-resizablesplit--horizontal` | Layout/ResizableSplit / Horizontal | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--horizontal | écart identifié | 3/6 identiques, max 0.004 % | f5-layout-shell |
| `layout-resizablesplit--vertical` | Layout/ResizableSplit / Vertical | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--vertical | écart identifié | 3/6 identiques, max 0.004 % | f5-layout-shell |
| `layout-resizablesplit--many-panes` | Layout/ResizableSplit / Many Panes | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--many-panes | écart identifié | 3/6 identiques, max 0.004 % | f5-layout-shell |
| `layout-resizablesplit--collapsed-pane` | Layout/ResizableSplit / Collapsed Pane | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--collapsed-pane | écart identifié | 0/6 identiques, max 0.003 % | f5-layout-shell |
| `layout-resizablesplit--nested` | Layout/ResizableSplit / Nested | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--nested | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `layout-resizablesplit--light` | Layout/ResizableSplit / Light | stories/components/layout/resizable-split.stories.tsx | gallery ?story=layout-resizablesplit--light | écart identifié | 0/6 identiques, max 0.004 % | f5-layout-shell |
| `layout-tabstrip--default` | Layout/TabStrip / Default | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--states` | Layout/TabStrip / States | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--states | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--unfocused` | Layout/TabStrip / Unfocused | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--unfocused | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--none-active` | Layout/TabStrip / None Active | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--none-active | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--overflow` | Layout/TabStrip / Overflow | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--overflow | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--context-menu-on-tabs` | Layout/TabStrip / Context Menu On Tabs | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--context-menu-on-tabs | vérifié | 6/6 identiques, max 0.000 % | f5-layout-shell |
| `layout-tabstrip--empty` | Layout/TabStrip / Empty | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--empty | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--behaviour-opt-outs` | Layout/TabStrip / Behaviour Opt Outs | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--behaviour-opt-outs | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--drag-to-reorder` | Layout/TabStrip / Drag To Reorder | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--drag-to-reorder | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--light` | Layout/TabStrip / Light | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--light | vérifié | 6/6 identiques, max 0.000 % | lot témoin |

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
