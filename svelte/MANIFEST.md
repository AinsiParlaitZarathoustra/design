# Manifeste de migration — @tryatlas/design 0.1.15 → @tryatlas/design-svelte

Généré le 2026-11-07T23:59:19.761Z depuis `/Users/maximebuffet/Documents/design` au SHA `0f4399832d06bc3558d35d5a96d6557f33d412b1`.

## Couverture

| Contrat | Total | Portés | Vérifiés | Non portés |
|---|---:|---:|---:|---:|
| Exports publics | 758 | 29 | 22 | 729 |
| Stories | 853 | 52 | 51 | 801 |

## Exports (racine, variantes, thème, session, blocs, animations, ratchet)

| Export | Entrées | Source | Svelte | Statut | Stories | Tests |
|---|---|---|---|---|---|---|
| `Accordion` | . | src/index.ts | — | non porté | 6 | — |
| `AccordionContent` | . | src/index.ts | — | non porté | 6 | — |
| `AccordionItem` | . | src/index.ts | — | non porté | 6 | — |
| `AccordionTrigger` | . | src/index.ts | — | non porté | 6 | — |
| `activateHintTarget` | . | src/index.ts | — | non porté | 0 | — |
| `ACTOR_COLOUR_HUE` | . | src/index.ts | — | non porté | 0 | — |
| `actorHue` | . | src/index.ts | — | non porté | 0 | — |
| `agentFamily` | . | src/index.ts | — | non porté | 7 | — |
| `AgentItem` | ./session | src/session.ts | — | non porté | 0 | — |
| `AgentMonogram` | . | src/index.ts | — | non porté | 3 | — |
| `AI21Mark` | . | src/index.ts | — | non porté | 3 | — |
| `AlertDialog` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogAction` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogCancel` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogContent` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogDescription` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogFooter` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogHeader` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogOverlay` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogPortal` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogTitle` | . | src/index.ts | — | non porté | 6 | — |
| `AlertDialogTrigger` | . | src/index.ts | — | non porté | 6 | — |
| `alphaOf` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ANSI_BG_CLASS` | . | src/index.ts | — | non porté | 0 | — |
| `ANSI_NAMES` | . | src/index.ts | — | non porté | 18 | — |
| `ANSI_TEXT_CLASS` | . | src/index.ts | — | non porté | 0 | — |
| `AnsiIndex` | . | src/index.ts | — | non porté | 18 | — |
| `AnthropicMark` | . | src/index.ts | — | non porté | 9 | — |
| `Appearance` | ., ./theme, ./blocks | src/index.ts | — | non porté | 0 | — |
| `AppFrame` | . | src/index.ts | — | non porté | 7 | — |
| `AppFrameInset` | . | src/index.ts | — | non porté | 0 | — |
| `AppShell` | . | src/index.ts | — | non porté | 8 | — |
| `ATLAS_PREFIX_RULE` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `AtlasBadge` | . | src/index.ts | — | non porté | 7 | — |
| `AtlasBadgeTone` | . | src/index.ts | — | non porté | 0 | — |
| `AtlasMark` | . | src/index.ts | — | non porté | 26 | — |
| `AtlasWordmark` | . | src/index.ts | — | non porté | 7 | — |
| `AttachmentView` | ./session | src/session.ts | — | non porté | 0 | — |
| `AuthAsideCopy` | . | src/index.ts | — | non porté | 5 | — |
| `AuthAsideNote` | . | src/index.ts | — | non porté | 5 | — |
| `AuthSplit` | . | src/index.ts | — | non porté | 5 | — |
| `Avatar` | . | src/index.ts | — | non porté | 33 | — |
| `AvatarFallback` | . | src/index.ts | — | non porté | 33 | — |
| `AvatarGroup` | . | src/index.ts | — | non porté | 6 | — |
| `AvatarGroupCount` | . | src/index.ts | — | non porté | 6 | — |
| `AvatarImage` | . | src/index.ts | — | non porté | 6 | — |
| `AvatarStack` | . | src/index.ts | — | non porté | 5 | — |
| `AzureMark` | . | src/index.ts | — | non porté | 3 | — |
| `Badge` | ., ./variants | src/index.ts | src/ui/badge.svelte | vérifié | 35 | tests/primitives.test.ts |
| `BadgeProps` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `badgeVariants` | ., ./variants | src/index.ts | src/ui/badge-variants.ts | porté | 0 | — |
| `BASE_RULE_REGISTRY` | ./theme | src/theme/index.ts | — | non porté | 1 | — |
| `BaseRule` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `BellGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `BlockSplit` | ./session | src/session.ts | — | non porté | 0 | — |
| `BlurEdge` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `BodyLoad` | ./session | src/session.ts | — | non porté | 0 | — |
| `BrandMarkProps` | . | src/index.ts | — | non porté | 0 | — |
| `Breadcrumb` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbEllipsis` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbItem` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbLink` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbList` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbPage` | . | src/index.ts | — | non porté | 5 | — |
| `BreadcrumbSeparator` | . | src/index.ts | — | non porté | 5 | — |
| `Button` | . | src/index.ts | src/ui/button.svelte | vérifié | 267 | tests/primitives.test.ts |
| `ButtonProps` | . | src/index.ts | — | non porté | 0 | — |
| `buttonVariants` | ., ./variants | src/index.ts | src/ui/button-variants.ts | vérifié | 0 | tests/primitives.test.ts |
| `CalendarDay` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | — | non porté | 0 | — |
| `CalendarItem` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | — | non porté | 8 | — |
| `Callout` | . | src/index.ts | — | non porté | 11 | — |
| `calloutVariants` | ., ./variants | src/index.ts | — | non porté | 11 | — |
| `CANVAS_EXPORT_FORMATS` | . | src/index.ts | — | non porté | 13 | — |
| `CANVAS_FIELD_CLASS` | . | src/index.ts | — | non porté | 13 | — |
| `CANVAS_GLASS` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasActionPill` | . | src/index.ts | — | non porté | 13 | — |
| `CanvasAnchor` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasBounds` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasCorner` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasDock` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasDraftBox` | . | src/index.ts | — | non porté | 1 | — |
| `CanvasExportFormat` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasFrame` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasHeaderPill` | . | src/index.ts | — | non porté | 14 | — |
| `CanvasLinkStatus` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasMedia` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasMinimap` | . | src/index.ts | — | non porté | 6 | — |
| `CanvasNodeFrame` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasNodeKind` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasNote` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasPageAuthor` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasPageDropIndicator` | . | src/index.ts | — | non porté | 18 | — |
| `CanvasPageRow` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasPageRowAction` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasPagesPanel` | . | src/index.ts | — | non porté | 22 | — |
| `CanvasPill` | . | src/index.ts | — | non porté | 1 | — |
| `CanvasPillButton` | . | src/index.ts | — | non porté | 1 | — |
| `CanvasPillDivider` | . | src/index.ts | — | non porté | 1 | — |
| `CanvasShape` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasShapeKind` | . | src/index.ts | — | non porté | 0 | — |
| `CanvasStatusChip` | . | src/index.ts | — | non porté | 5 | — |
| `CanvasSurface` | . | src/index.ts | — | non porté | 48 | — |
| `CanvasText` | . | src/index.ts | — | non porté | 17 | — |
| `CanvasToolbar` | . | src/index.ts | — | non porté | 11 | — |
| `CanvasToolItem` | . | src/index.ts | — | non porté | 7 | — |
| `CerebrasMark` | . | src/index.ts | — | non porté | 3 | — |
| `Checkbox` | . | src/index.ts | — | non porté | 20 | — |
| `CheckpointTrace` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `CheckpointTraceProps` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `CheckpointView` | ./session | src/session.ts | — | non porté | 0 | — |
| `clampUiScale` | . | src/index.ts | — | non porté | 0 | — |
| `ClaudeCodeMark` | . | src/index.ts | — | non porté | 27 | — |
| `ClaudeMark` | . | src/index.ts | — | non porté | 17 | — |
| `cn` | ., ./variants | src/index.ts | src/lib/utils.ts | vérifié | 44 | tests/primitives.test.ts |
| `Code` | . | src/index.ts | — | non porté | 22 | — |
| `CodeFence` | . | src/index.ts | — | non porté | 7 | — |
| `CodexMark` | . | src/index.ts | — | non porté | 27 | — |
| `CohereMark` | . | src/index.ts | — | non porté | 3 | — |
| `CollapsedSegment` | . | src/index.ts | — | non porté | 0 | — |
| `collapseSegments` | . | src/index.ts | — | non porté | 0 | — |
| `Collapsible` | . | src/index.ts | — | non porté | 4 | — |
| `CollapsibleContent` | . | src/index.ts | — | non porté | 4 | — |
| `CollapsibleTrigger` | . | src/index.ts | — | non porté | 4 | — |
| `ColorHueSlider` | . | src/index.ts | — | non porté | 4 | — |
| `ColorSaturationValuePlane` | . | src/index.ts | — | non porté | 4 | — |
| `colorToCss` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ColorTransform` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `Column` | . | src/index.ts | — | non porté | 7 | — |
| `Combobox` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxChip` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxChips` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxChipsInput` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxCollection` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxContent` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxEmpty` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxGroup` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxInput` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxItem` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxLabel` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxList` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxSeparator` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxTrigger` | . | src/index.ts | — | non porté | 12 | — |
| `ComboboxValue` | . | src/index.ts | — | non porté | 12 | — |
| `CommandAction` | . | src/index.ts | — | non porté | 6 | — |
| `CommandDialog` | . | src/index.ts | — | non porté | 6 | — |
| `CommandDialogPopup` | . | src/index.ts | — | non porté | 6 | — |
| `CommandEmpty` | . | src/index.ts | — | non porté | 6 | — |
| `CommandFooter` | . | src/index.ts | — | non porté | 6 | — |
| `CommandFooterHint` | . | src/index.ts | — | non porté | 6 | — |
| `CommandGroupLabel` | . | src/index.ts | — | non porté | 6 | — |
| `CommandHints` | . | src/index.ts | — | non porté | 15 | — |
| `CommandInput` | . | src/index.ts | — | non porté | 6 | — |
| `CommandItem` | . | src/index.ts | — | non porté | 6 | — |
| `CommandItemIcon` | . | src/index.ts | — | non porté | 6 | — |
| `CommandList` | . | src/index.ts | — | non porté | 15 | — |
| `CommandMenu` | . | src/index.ts | — | non porté | 6 | — |
| `CommandPalette` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteGroup` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteItem` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommandPaletteView` | . | src/index.ts | — | non porté | 15 | — |
| `CommandPaletteViewProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommandPanel` | . | src/index.ts | — | non porté | 31 | — |
| `CommandRow` | . | src/index.ts | — | non porté | 15 | — |
| `CommandShortcut` | . | src/index.ts | — | non porté | 6 | — |
| `CommandSize` | . | src/index.ts | — | non porté | 0 | — |
| `CommandSubmenuChevron` | . | src/index.ts | — | non porté | 6 | — |
| `CommandSuggestion` | . | src/index.ts | — | non porté | 1 | — |
| `commandSuggestionId` | . | src/index.ts | — | non porté | 0 | — |
| `CommandSuggestions` | . | src/index.ts | — | non porté | 1 | — |
| `CommandSuggestionsProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommentAnchor` | ./session | src/session.ts | — | non porté | 0 | — |
| `CommentView` | ./session | src/session.ts | — | non porté | 0 | — |
| `COMMS_GROUP_WINDOW_MS` | . | src/index.ts | — | non porté | 0 | — |
| `CommsAuthor` | . | src/index.ts | — | non porté | 0 | — |
| `CommsCallMarker` | . | src/index.ts | — | non porté | 0 | — |
| `CommsComposerSendState` | . | src/index.ts | — | non porté | 0 | — |
| `CommsComposerShell` | . | src/index.ts | — | non porté | 16 | — |
| `CommsComposerShellProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationKind` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationRow` | . | src/index.ts | — | non porté | 13 | — |
| `CommsConversationRowProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationRowView` | . | src/index.ts | — | non porté | 0 | — |
| `CommsConversationSelect` | . | src/index.ts | — | non porté | 0 | — |
| `CommsDayDivider` | . | src/index.ts | — | non porté | 21 | — |
| `CommsDayDividerProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsMessageRow` | . | src/index.ts | — | non porté | 21 | — |
| `CommsMessageRowLabels` | . | src/index.ts | — | non porté | 0 | — |
| `CommsMessageRowPermissions` | . | src/index.ts | — | non porté | 0 | — |
| `CommsMessageRowProps` | . | src/index.ts | — | non porté | 0 | — |
| `CommsMessageView` | . | src/index.ts | — | non porté | 0 | — |
| `CommsReaction` | . | src/index.ts | — | non porté | 0 | — |
| `CommsReplyRef` | . | src/index.ts | — | non porté | 0 | — |
| `CommsSendState` | . | src/index.ts | — | non porté | 0 | — |
| `CommsTranscriptRow` | . | src/index.ts | — | non porté | 0 | — |
| `CommsUnreadBadge` | . | src/index.ts | — | non porté | 0 | — |
| `CommsUnreadLine` | . | src/index.ts | — | non porté | 21 | — |
| `CommsUnreadLineProps` | . | src/index.ts | — | non porté | 0 | — |
| `CompoundFilter` | . | src/index.ts | — | non porté | 5 | — |
| `ContextMenu` | . | src/index.ts | — | non porté | 14 | — |
| `ContextMenuCheckboxItem` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuContent` | . | src/index.ts | — | non porté | 14 | — |
| `ContextMenuGroup` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuItem` | . | src/index.ts | — | non porté | 14 | — |
| `ContextMenuLabel` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuPortal` | . | src/index.ts | — | non porté | 0 | — |
| `ContextMenuRadioGroup` | . | src/index.ts | — | non porté | 0 | — |
| `ContextMenuSeparator` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuShortcut` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuSub` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuSubContent` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuSubTrigger` | . | src/index.ts | — | non porté | 4 | — |
| `ContextMenuTrigger` | . | src/index.ts | — | non porté | 14 | — |
| `contrastRatio` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `conversationTitle` | . | src/index.ts | — | non porté | 0 | — |
| `CopyGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `createToastManager` | . | src/index.ts | — | non porté | 7 | — |
| `CursorAgentMark` | . | src/index.ts | — | non porté | 8 | — |
| `CursorMark` | . | src/index.ts | — | non porté | 12 | — |
| `D23_RENAMES` | . | src/index.ts | — | non porté | 0 | — |
| `D23Rename` | . | src/index.ts | — | non porté | 0 | — |
| `DashedRails` | ., ./blocks | src/index.ts | — | non porté | 3 | — |
| `DataTable` | . | src/index.ts | — | non porté | 7 | — |
| `DataTableSort` | . | src/index.ts | — | non porté | 7 | — |
| `DeepInfraMark` | . | src/index.ts | — | non porté | 3 | — |
| `DeepSeekMark` | . | src/index.ts | — | non porté | 3 | — |
| `DEFAULT_COMMS_MESSAGE_ROW_LABELS` | . | src/index.ts | — | non porté | 0 | — |
| `DEFAULT_TOOL_CALL_CARD_LABELS` | ./session | src/session.ts | — | non porté | 0 | — |
| `DEFAULT_TRACE_LABELS` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `DefaultDiff` | ./session | src/session.ts | — | non porté | 16 | — |
| `DefaultDiffProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `defineRatchetSuite` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `DeltaChip` | . | src/index.ts | — | non porté | 8 | — |
| `DeltaTone` | . | src/index.ts | — | non porté | 0 | — |
| `DerivationContext` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `DERIVED_VAR_REGISTRY` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `DerivedVar` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `DerivedVarDefinition` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `describeDerivation` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `DetailPane` | . | src/index.ts | — | non porté | 5 | — |
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
| `DiffData` | ./session | src/session.ts | — | non porté | 0 | — |
| `DiffStat` | . | src/index.ts | — | non porté | 7 | — |
| `DiscordMark` | . | src/index.ts | — | non porté | 8 | — |
| `DitherField` | ., ./blocks | src/index.ts | — | non porté | 6 | — |
| `DotMatrix` | . | src/index.ts | — | non porté | 13 | — |
| `DrillInRow` | . | src/index.ts | — | non porté | 10 | — |
| `DropdownMenu` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuCheckboxItem` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuContent` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuGroup` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuItem` | . | src/index.ts | — | non porté | 11 | — |
| `DropdownMenuLabel` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuPortal` | . | src/index.ts | — | non porté | 0 | — |
| `DropdownMenuRadioGroup` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuRadioItem` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuSeparator` | . | src/index.ts | — | non porté | 11 | — |
| `DropdownMenuShortcut` | . | src/index.ts | — | non porté | 11 | — |
| `DropdownMenuSub` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuSubContent` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuSubTrigger` | . | src/index.ts | — | non porté | 7 | — |
| `DropdownMenuTrigger` | . | src/index.ts | — | non porté | 7 | — |
| `EASE_PANEL` | . | src/index.ts | — | non porté | 1 | — |
| `EditorBreadcrumbs` | . | src/index.ts | — | non porté | 11 | — |
| `EditorBreadcrumbsProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorFrame` | . | src/index.ts | — | non porté | 8 | — |
| `EditorFrameProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorPreview` | . | src/index.ts | — | non porté | 11 | — |
| `EditorPreviewLine` | . | src/index.ts | — | non porté | 0 | — |
| `EditorPreviewProps` | . | src/index.ts | — | non porté | 0 | — |
| `EditorPreviewToken` | . | src/index.ts | — | non porté | 0 | — |
| `EditorStatusBar` | . | src/index.ts | — | non porté | 11 | — |
| `EditorStatusBarProps` | . | src/index.ts | — | non porté | 0 | — |
| `ElevenLabsMark` | . | src/index.ts | — | non porté | 3 | — |
| `EMPTY_SPLIT` | ./session | src/session.ts | — | non porté | 0 | — |
| `EmptyState` | . | src/index.ts | — | non porté | 6 | — |
| `ErrorKind` | ./session | src/session.ts | — | non porté | 0 | — |
| `ExternalAgentMark` | . | src/index.ts | — | non porté | 3 | — |
| `familyOf` | . | src/index.ts | — | non porté | 7 | — |
| `Field` | . | src/index.ts | — | non porté | 8 | — |
| `FieldContent` | . | src/index.ts | — | non porté | 8 | — |
| `FieldDescription` | . | src/index.ts | — | non porté | 8 | — |
| `FieldError` | . | src/index.ts | — | non porté | 8 | — |
| `FieldGroup` | . | src/index.ts | — | non porté | 8 | — |
| `FieldLabel` | . | src/index.ts | — | non porté | 8 | — |
| `FieldLegend` | . | src/index.ts | — | non porté | 8 | — |
| `FieldSeparator` | . | src/index.ts | — | non porté | 8 | — |
| `FieldSet` | . | src/index.ts | — | non porté | 8 | — |
| `FieldTitle` | . | src/index.ts | — | non porté | 8 | — |
| `filterCommandGroups` | . | src/index.ts | — | non porté | 15 | — |
| `FindBar` | . | src/index.ts | — | non porté | 14 | — |
| `FindBarProps` | . | src/index.ts | — | non porté | 6 | — |
| `FindFlag` | . | src/index.ts | — | non porté | 0 | — |
| `FireworksMark` | . | src/index.ts | — | non porté | 3 | — |
| `formatBytes` | ./session | src/session.ts | — | non porté | 0 | — |
| `formatClock` | . | src/index.ts | — | non porté | 0 | — |
| `formatDayLabel` | . | src/index.ts | — | non porté | 0 | — |
| `formatDiffCount` | . | src/index.ts | — | non porté | 0 | — |
| `formatDuration` | ., ./session | src/index.ts | — | non porté | 0 | — |
| `formatViolations` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `GeminiMark` | . | src/index.ts | — | non porté | 17 | — |
| `generateHintLabels` | . | src/index.ts | — | non porté | 0 | — |
| `GhostCards` | ., ./blocks | src/index.ts | — | non porté | 2 | — |
| `GitHubMark` | . | src/index.ts | — | non porté | 17 | — |
| `Globe` | ., ./blocks | src/index.ts | — | non porté | 21 | — |
| `GlobeMarker` | ., ./blocks | src/index.ts | — | non porté | 6 | — |
| `GoChevron` | . | src/index.ts | — | non porté | 4 | — |
| `GoogleMark` | . | src/index.ts | — | non porté | 16 | — |
| `GradualBlur` | ., ./blocks | src/index.ts | — | non porté | 4 | — |
| `GradualBlurProps` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `GroqMark` | . | src/index.ts | — | non porté | 3 | — |
| `hasReferenceDefinitions` | ./session | src/session.ts | — | non porté | 0 | — |
| `hexOf` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `highlightRanges` | . | src/index.ts | — | non porté | 24 | — |
| `HighlightSegment` | . | src/index.ts | — | non porté | 0 | — |
| `Hint` | . | src/index.ts | src/ui/hint.svelte | porté | 28 | — |
| `HINT_ALPHABET` | . | src/index.ts | — | non porté | 0 | — |
| `HINT_OVERLAY_ATTR` | . | src/index.ts | — | non porté | 0 | — |
| `HINT_SELECTOR` | . | src/index.ts | — | non porté | 0 | — |
| `HintGroup` | . | src/index.ts | — | non porté | 3 | — |
| `HintItem` | . | src/index.ts | — | non porté | 3 | — |
| `HintOverlay` | . | src/index.ts | — | non porté | 4 | — |
| `HintOverlayProps` | . | src/index.ts | — | non porté | 0 | — |
| `HintTarget` | . | src/index.ts | — | non porté | 0 | — |
| `hintTriggerProps` | . | src/index.ts | — | non porté | 0 | — |
| `hrefOf` | . | src/index.ts | — | non porté | 0 | — |
| `HsvColor` | ./theme | src/theme/index.ts | — | non porté | 4 | — |
| `hsvToHex` | ./theme | src/theme/index.ts | — | non porté | 4 | — |
| `HUD` | . | src/index.ts | — | non porté | 1 | — |
| `HUE_BG` | . | src/index.ts | — | non porté | 0 | — |
| `HUE_CHIP` | . | src/index.ts | — | non porté | 0 | — |
| `HueDot` | . | src/index.ts | — | non porté | 8 | — |
| `hueFor` | . | src/index.ts | — | non porté | 0 | — |
| `HUES` | . | src/index.ts | — | non porté | 17 | — |
| `HuggingFaceMark` | . | src/index.ts | — | non porté | 3 | — |
| `Icon` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 206 | tests/primitives.test.ts |
| `ICON_SIZES` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 8 | tests/primitives.test.ts |
| `ICON_STROKE_WIDTH` | ., ./variants | src/index.ts | src/ui/icon.svelte | vérifié | 1 | tests/primitives.test.ts |
| `IconButton` | . | src/index.ts | src/ui/icon-button.svelte | vérifié | 119 | tests/primitives.test.ts |
| `IconButtonProps` | . | src/index.ts | — | non porté | 0 | — |
| `iconButtonVariants` | ., ./variants | src/index.ts | src/ui/icon-button-variants.ts | porté | 0 | — |
| `IconProps` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `IconSize` | ., ./variants | src/index.ts | src/ui/icon.svelte | porté | 8 | — |
| `INFINITE_ANIMATION_FPS_VAR` | ., ./animations | src/index.ts | — | non porté | 5 | — |
| `INFINITE_ANIMATIONS` | ., ./animations | src/index.ts | — | non porté | 1 | — |
| `InfiniteAnimation` | ., ./animations | src/index.ts | — | non porté | 0 | — |
| `infiniteAnimationFps` | ., ./animations | src/index.ts | — | non porté | 0 | — |
| `InfiniteSlider` | ., ./blocks | src/index.ts | — | non porté | 5 | — |
| `InfiniteSliderProps` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `InfoLinks` | . | src/index.ts | — | non porté | 5 | — |
| `InfoMenu` | . | src/index.ts | — | non porté | 19 | — |
| `initialsOf` | . | src/index.ts | — | non porté | 0 | — |
| `Input` | . | src/index.ts | src/ui/input.svelte | vérifié | 42 | tests/input.test.ts |
| `InputGroup` | . | src/index.ts | — | non porté | 9 | — |
| `InputGroupAddon` | . | src/index.ts | — | non porté | 9 | — |
| `InputGroupButton` | . | src/index.ts | — | non porté | 9 | — |
| `InputGroupInput` | . | src/index.ts | — | non porté | 9 | — |
| `InputGroupText` | . | src/index.ts | — | non porté | 9 | — |
| `InputGroupTextarea` | . | src/index.ts | — | non porté | 9 | — |
| `InputProps` | . | src/index.ts | — | non porté | 0 | — |
| `inputVariants` | ., ./variants | src/index.ts | src/ui/input-variants.ts | vérifié | 0 | tests/input.test.ts |
| `isAt` | . | src/index.ts | — | non porté | 0 | — |
| `isFocusVisible` | . | src/index.ts | — | non porté | 0 | — |
| `isIncompleteCodeFence` | ./session | src/session.ts | — | non porté | 0 | — |
| `isTooltipWarm` | . | src/index.ts | — | non porté | 0 | — |
| `JetBrainsMark` | . | src/index.ts | — | non porté | 8 | — |
| `JinaMark` | . | src/index.ts | — | non porté | 3 | — |
| `Kbd` | . | src/index.ts | src/ui/kbd.svelte | vérifié | 63 | tests/primitives.test.ts |
| `KbdCombo` | . | src/index.ts | src/ui/kbd-combo.svelte | vérifié | 6 | tests/primitives.test.ts |
| `KbdGroup` | . | src/index.ts | — | non porté | 0 | — |
| `KbdKeys` | . | src/index.ts | src/ui/kbd-keys.svelte | porté | 6 | — |
| `KbdKeysProps` | . | src/index.ts | — | non porté | 0 | — |
| `KbdProps` | . | src/index.ts | — | non porté | 0 | — |
| `kbdVariants` | ., ./variants | src/index.ts | src/ui/kbd-variants.ts | porté | 0 | — |
| `KeyPlatform` | . | src/index.ts | — | non porté | 0 | — |
| `KiloMark` | . | src/index.ts | — | non porté | 8 | — |
| `KimiMark` | . | src/index.ts | — | non porté | 3 | — |
| `KpiCell` | . | src/index.ts | — | non porté | 8 | — |
| `KpiStrip` | . | src/index.ts | — | non porté | 8 | — |
| `Label` | . | src/index.ts | — | non porté | 17 | — |
| `LabelMark` | . | src/index.ts | — | non porté | 8 | — |
| `LabelTone` | . | src/index.ts | — | non porté | 0 | — |
| `lighten` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `LinkComponent` | . | src/index.ts | — | non porté | 0 | — |
| `LinkLocation` | . | src/index.ts | — | non porté | 0 | — |
| `LinkProps` | . | src/index.ts | — | non porté | 0 | — |
| `LinkProvider` | . | src/index.ts | — | non porté | 0 | — |
| `linkVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `ListDetail` | . | src/index.ts | — | non porté | 5 | — |
| `ListPane` | . | src/index.ts | — | non porté | 5 | — |
| `LOCAL_CANVAS_TOOL_GROUPS` | . | src/index.ts | — | non porté | 11 | — |
| `Logo` | ., ./blocks | src/index.ts | — | non porté | 4 | — |
| `LogoMarquee` | ., ./blocks | src/index.ts | — | non porté | 9 | — |
| `MailboxIcon` | . | src/index.ts | — | non porté | 3 | — |
| `MailboxIconHandle` | . | src/index.ts | — | non porté | 3 | — |
| `markTooltipClosed` | . | src/index.ts | — | non porté | 0 | — |
| `markTooltipOpen` | . | src/index.ts | — | non porté | 0 | — |
| `menuContentVariants` | ., ./variants | src/index.ts | — | non porté | 7 | — |
| `MenuGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `MenuHighlight` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `menuItemVariants` | ., ./variants | src/index.ts | — | non porté | 7 | — |
| `menuLabelVariants` | ., ./variants | src/index.ts | — | non porté | 7 | — |
| `menuShortcutVariants` | ., ./variants | src/index.ts | — | non porté | 7 | — |
| `MessageSquareMoreIcon` | . | src/index.ts | — | non porté | 3 | — |
| `MessageSquareMoreIconHandle` | . | src/index.ts | — | non porté | 3 | — |
| `MetaMark` | . | src/index.ts | — | non porté | 3 | — |
| `MeterCard` | . | src/index.ts | — | non porté | 7 | — |
| `MistralMark` | . | src/index.ts | — | non porté | 3 | — |
| `mix` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ModelBadge` | . | src/index.ts | — | non porté | 8 | — |
| `ModelFamily` | . | src/index.ts | — | non porté | 7 | — |
| `ModelMark` | . | src/index.ts | — | non porté | 24 | — |
| `monogramTextClass` | . | src/index.ts | — | non porté | 0 | — |
| `NextPage` | . | src/index.ts | — | non porté | 4 | — |
| `NextPageProps` | . | src/index.ts | — | non porté | 0 | — |
| `normalizeSearchText` | . | src/index.ts | — | non porté | 0 | — |
| `OpenAIMark` | . | src/index.ts | — | non porté | 20 | — |
| `OpenCodeMark` | . | src/index.ts | — | non porté | 8 | — |
| `OpenRouterMark` | . | src/index.ts | — | non porté | 3 | — |
| `optionId` | . | src/index.ts | — | non porté | 25 | — |
| `Organisation` | . | src/index.ts | — | non porté | 0 | — |
| `OrgMark` | . | src/index.ts | — | non porté | 7 | — |
| `OrgSwitcher` | . | src/index.ts | — | non porté | 21 | — |
| `PACKAGE_SENTINEL_CLASS` | . | src/index.ts | — | non porté | 0 | — |
| `PageHeader` | . | src/index.ts | — | non porté | 26 | — |
| `PALETTE_KEYS` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `PaletteKey` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `Panel` | . | src/index.ts | — | non porté | 6 | — |
| `PANEL_ENTER` | . | src/index.ts | — | non porté | 0 | — |
| `PANEL_STAGGER` | . | src/index.ts | — | non porté | 0 | — |
| `parseColor` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `pathSegments` | . | src/index.ts | — | non porté | 11 | — |
| `Payload` | ./session | src/session.ts | — | non porté | 0 | — |
| `PEER_INK` | . | src/index.ts | — | non porté | 0 | — |
| `PerplexityMark` | . | src/index.ts | — | non porté | 3 | — |
| `PersonAvatar` | . | src/index.ts | — | non porté | 19 | — |
| `PersonRef` | ./session | src/session.ts | — | non porté | 0 | — |
| `Pill` | . | src/index.ts | — | non porté | 10 | — |
| `PillProps` | . | src/index.ts | — | non porté | 0 | — |
| `PillSize` | . | src/index.ts | — | non porté | 0 | — |
| `PillSurface` | . | src/index.ts | — | non porté | 0 | — |
| `PlanItem` | ./session | src/session.ts | — | non porté | 0 | — |
| `platformKey` | . | src/index.ts | — | non porté | 0 | — |
| `platformKeys` | . | src/index.ts | — | non porté | 0 | — |
| `PlusCorners` | ., ./blocks | src/index.ts | — | non porté | 2 | — |
| `PlusDecorator` | ., ./blocks | src/index.ts | — | non porté | 2 | — |
| `PlusMinusGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `Popover` | . | src/index.ts | — | non porté | 7 | — |
| `PopoverClose` | . | src/index.ts | — | non porté | 0 | — |
| `PopoverContent` | . | src/index.ts | — | non porté | 7 | — |
| `PopoverDescription` | . | src/index.ts | — | non porté | 7 | — |
| `PopoverHeader` | . | src/index.ts | — | non porté | 7 | — |
| `PopoverPortal` | . | src/index.ts | — | non porté | 0 | — |
| `PopoverTitle` | . | src/index.ts | — | non porté | 7 | — |
| `PopoverTrigger` | . | src/index.ts | — | non porté | 7 | — |
| `prefersReducedMotion` | . | src/index.ts | — | non porté | 0 | — |
| `PresenceCursor` | . | src/index.ts | — | non porté | 6 | — |
| `PresenceLayer` | . | src/index.ts | — | non porté | 6 | — |
| `PresencePeer` | . | src/index.ts | — | non porté | 0 | — |
| `Priority` | . | src/index.ts | — | non porté | 0 | — |
| `PriorityIcon` | . | src/index.ts | — | non porté | 5 | — |
| `ProfileMenu` | . | src/index.ts | — | non porté | 19 | — |
| `Progress` | . | src/index.ts | — | non porté | 8 | — |
| `ProgressIndicator` | . | src/index.ts | — | non porté | 8 | — |
| `ProgressLabel` | . | src/index.ts | — | non porté | 8 | — |
| `ProgressTone` | . | src/index.ts | — | non porté | 0 | — |
| `ProgressTrack` | . | src/index.ts | — | non porté | 8 | — |
| `ProgressValue` | . | src/index.ts | — | non porté | 8 | — |
| `PropertiesPane` | . | src/index.ts | — | non porté | 5 | — |
| `PropertyRow` | . | src/index.ts | — | non porté | 5 | — |
| `QwenMark` | . | src/index.ts | — | non porté | 3 | — |
| `RadioGroup` | . | src/index.ts | — | non porté | 5 | — |
| `RadioGroupItem` | . | src/index.ts | — | non porté | 5 | — |
| `Rail` | . | src/index.ts | — | non porté | 1 | — |
| `RailGlyph` | . | src/index.ts | — | non porté | 16 | — |
| `RailGroup` | . | src/index.ts | — | non porté | 5 | — |
| `RailLink` | . | src/index.ts | — | non porté | 5 | — |
| `RailNode` | . | src/index.ts | — | non porté | 1 | — |
| `RailProps` | . | src/index.ts | — | non porté | 0 | — |
| `RatchetOptions` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetRule` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetSuiteConfig` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetSuiteRunner` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `RatchetViolation` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `reactionChips` | . | src/index.ts | — | non porté | 0 | — |
| `readable` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ReplicateMark` | . | src/index.ts | — | non porté | 3 | — |
| `resetTooltipTiming` | . | src/index.ts | — | non porté | 7 | — |
| `ResizableHandle` | . | src/index.ts | — | non porté | 6 | — |
| `ResizableLayout` | . | src/index.ts | — | non porté | 0 | — |
| `ResizableOrientation` | . | src/index.ts | — | non porté | 0 | — |
| `ResizablePane` | . | src/index.ts | — | non porté | 6 | — |
| `ResizableSplit` | . | src/index.ts | — | non porté | 6 | — |
| `resolveBase` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `resolveClassName` | . | src/index.ts | — | non porté | 0 | — |
| `resolveColor` | . | src/index.ts | — | non porté | 0 | — |
| `ResolvedTheme` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `resolveTheme` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `resolveToken` | . | src/index.ts | — | non porté | 0 | — |
| `Rgb` | . | src/index.ts | — | non porté | 0 | — |
| `RgbaColor` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `rgbString` | . | src/index.ts | — | non porté | 0 | — |
| `Role` | . | src/index.ts | — | non porté | 0 | — |
| `RULES` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `runRatchet` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `scanHintTargets` | . | src/index.ts | — | non porté | 0 | — |
| `ScrollArea` | . | src/index.ts | — | non porté | 2 | — |
| `ScrollEdges` | . | src/index.ts | — | non porté | 0 | — |
| `ScrollFade` | . | src/index.ts | — | non porté | 2 | — |
| `ScrollRail` | . | src/index.ts | — | non porté | 3 | — |
| `SearchOverlay` | . | src/index.ts | — | non porté | 10 | — |
| `SearchOverlayProps` | . | src/index.ts | — | non porté | 0 | — |
| `SearchResult` | . | src/index.ts | — | non porté | 10 | — |
| `SearchResultRow` | . | src/index.ts | — | non porté | 10 | — |
| `SearchStatus` | . | src/index.ts | — | non porté | 10 | — |
| `SecretInput` | . | src/index.ts | — | non porté | 5 | — |
| `SecretInputProps` | . | src/index.ts | — | non porté | 0 | — |
| `SectionHeader` | . | src/index.ts | — | non porté | 11 | — |
| `segmentClassName` | . | src/index.ts | — | non porté | 0 | — |
| `Segmented` | . | src/index.ts | — | non porté | 9 | — |
| `SegmentedIconGroup` | . | src/index.ts | — | non porté | 5 | — |
| `SegmentedOption` | . | src/index.ts | — | non porté | 0 | — |
| `SegmentedProps` | . | src/index.ts | — | non porté | 8 | — |
| `SegmentMeter` | . | src/index.ts | — | non porté | 7 | — |
| `Select` | . | src/index.ts | — | non porté | 13 | — |
| `selectableIds` | . | src/index.ts | — | non porté | 15 | — |
| `SelectOption` | . | src/index.ts | — | non porté | 0 | — |
| `SelectProps` | . | src/index.ts | — | non porté | 13 | — |
| `SendGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `Separator` | . | src/index.ts | — | non porté | 3 | — |
| `Session` | . | src/index.ts | — | non porté | 0 | — |
| `SessionErrorView` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionLabel` | . | src/index.ts | — | non porté | 0 | — |
| `SessionMeta` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionPhase` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionPipeline` | ./session | src/session.ts | — | non porté | 4 | — |
| `SessionPipelineProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionPriority` | . | src/index.ts | — | non porté | 0 | — |
| `SessionStatus` | . | src/index.ts | — | non porté | 0 | — |
| `SessionStatusKind` | . | src/index.ts | — | non porté | 0 | — |
| `SessionTimeline` | ./session | src/session.ts | — | non porté | 17 | — |
| `SessionTimelineProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `SessionView` | ./session | src/session.ts | — | non porté | 0 | — |
| `SettingCard` | . | src/index.ts | — | non porté | 10 | — |
| `SettingRow` | . | src/index.ts | — | non porté | 10 | — |
| `SettingsNavGroup` | . | src/index.ts | — | non porté | 5 | — |
| `SettingsNavItem` | . | src/index.ts | — | non porté | 0 | — |
| `SettingsShell` | . | src/index.ts | — | non porté | 5 | — |
| `Sheet` | . | src/index.ts | — | non porté | 5 | — |
| `SheetClose` | . | src/index.ts | — | non porté | 5 | — |
| `SheetContent` | . | src/index.ts | — | non porté | 5 | — |
| `SheetDescription` | . | src/index.ts | — | non porté | 5 | — |
| `SheetFooter` | . | src/index.ts | — | non porté | 5 | — |
| `SheetHeader` | . | src/index.ts | — | non porté | 5 | — |
| `SheetTitle` | . | src/index.ts | — | non porté | 5 | — |
| `SheetTrigger` | . | src/index.ts | — | non porté | 5 | — |
| `Sidebar` | . | src/index.ts | — | non porté | 13 | — |
| `SidebarBody` | . | src/index.ts | — | non porté | 13 | — |
| `SidebarChild` | . | src/index.ts | — | non porté | 0 | — |
| `SidebarFooter` | . | src/index.ts | — | non porté | 6 | — |
| `SidebarGroup` | . | src/index.ts | — | non porté | 21 | — |
| `SidebarHeader` | . | src/index.ts | — | non porté | 13 | — |
| `SidebarItem` | . | src/index.ts | — | non porté | 21 | — |
| `SidebarPanel` | . | src/index.ts | — | non porté | 13 | — |
| `SidebarSearch` | . | src/index.ts | — | non porté | 6 | — |
| `SideDock` | . | src/index.ts | — | non porté | 15 | — |
| `SideDockMode` | . | src/index.ts | — | non porté | 0 | — |
| `SideDockSizeToggle` | . | src/index.ts | — | non porté | 15 | — |
| `Skeleton` | . | src/index.ts | — | non porté | 8 | — |
| `SkeletonRadius` | . | src/index.ts | — | non porté | 0 | — |
| `slideGeometry` | . | src/index.ts | — | non porté | 0 | — |
| `SlideGeometry` | . | src/index.ts | — | non porté | 0 | — |
| `Slider` | . | src/index.ts | — | non porté | 5 | — |
| `SliderProps` | . | src/index.ts | — | non porté | 5 | — |
| `slideTransition` | . | src/index.ts | — | non porté | 0 | — |
| `SPACES_TOOL_GROUPS` | . | src/index.ts | — | non porté | 11 | — |
| `Spinner` | . | src/index.ts | src/components/ui/spinner.svelte | vérifié | 15 | tests/tab-strip.test.ts |
| `SplitButton` | . | src/index.ts | — | non porté | 4 | — |
| `SplitButtonProps` | . | src/index.ts | — | non porté | 0 | — |
| `splitGlyphCombo` | . | src/index.ts | — | non porté | 0 | — |
| `splitHighlights` | . | src/index.ts | — | non porté | 0 | — |
| `splitIncremental` | ./session | src/session.ts | — | non porté | 0 | — |
| `splitTopLevelBlocks` | ./session | src/session.ts | — | non porté | 0 | — |
| `SPRING_DOCK` | . | src/index.ts | — | non porté | 1 | — |
| `SPRING_INDICATOR` | . | src/index.ts | — | non porté | 1 | — |
| `SPRING_PILL` | . | src/index.ts | — | non porté | 1 | — |
| `SPRING_RAIL` | . | src/index.ts | — | non porté | 1 | — |
| `StatCard` | . | src/index.ts | — | non porté | 7 | — |
| `StatGrid` | . | src/index.ts | — | non porté | 7 | — |
| `StatusDot` | . | src/index.ts | — | non porté | 15 | — |
| `StatusDotCutout` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotProps` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotSize` | . | src/index.ts | — | non porté | 0 | — |
| `StatusDotTone` | . | src/index.ts | — | non porté | 5 | — |
| `StatusIcon` | . | src/index.ts | — | non porté | 24 | — |
| `statusIconOf` | ./session | src/session.ts | — | non porté | 0 | — |
| `stepHighlight` | . | src/index.ts | — | non porté | 0 | — |
| `StepList` | . | src/index.ts | — | non porté | 5 | — |
| `StepListProps` | . | src/index.ts | — | non porté | 0 | — |
| `StepListStep` | . | src/index.ts | — | non porté | 0 | — |
| `StepStatus` | . | src/index.ts | — | non porté | 0 | — |
| `StreamingMarkdown` | ./session | src/session.ts | — | non porté | 4 | — |
| `StreamingMarkdownProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `StreamingState` | ./session | src/session.ts | — | non porté | 0 | — |
| `strictRules` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `stripAnsi` | ./session | src/session.ts | — | non porté | 0 | — |
| `Switch` | . | src/index.ts | — | non porté | 24 | — |
| `SwitchProps` | . | src/index.ts | — | non porté | 7 | — |
| `SYNTAX_TEXT_CLASS` | . | src/index.ts | — | non porté | 3 | — |
| `SyntaxRole` | . | src/index.ts | — | non porté | 3 | — |
| `Table` | . | src/index.ts | — | non porté | 6 | — |
| `TableBody` | . | src/index.ts | — | non porté | 6 | — |
| `TableCaption` | . | src/index.ts | — | non porté | 6 | — |
| `TableCell` | . | src/index.ts | — | non porté | 6 | — |
| `TableFooter` | . | src/index.ts | — | non porté | 6 | — |
| `TableHead` | . | src/index.ts | — | non porté | 6 | — |
| `TableHeader` | . | src/index.ts | — | non porté | 6 | — |
| `TableRow` | . | src/index.ts | — | non porté | 6 | — |
| `TableSearch` | . | src/index.ts | — | non porté | 7 | — |
| `Tabs` | . | src/index.ts | — | non porté | 7 | — |
| `TabsContent` | . | src/index.ts | — | non porté | 7 | — |
| `TabsList` | . | src/index.ts | — | non porté | 7 | — |
| `tabsListVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `TabsTrigger` | . | src/index.ts | — | non porté | 7 | — |
| `TabStrip` | . | src/index.ts | src/components/layout/tab-strip.svelte | vérifié | 10 | tests/tab-strip.test.ts |
| `TabStripItem` | . | src/index.ts | src/components/layout/tab-strip-logic.ts | porté | 0 | — |
| `TabStripTabProps` | . | src/index.ts | — | non porté | 0 | — |
| `Tag` | . | src/index.ts | — | non porté | 8 | — |
| `TerminalBlock` | . | src/index.ts | — | non porté | 18 | — |
| `TerminalBlockProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalCommandInput` | . | src/index.ts | — | non porté | 6 | — |
| `TerminalCommandInputProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalLine` | . | src/index.ts | — | non porté | 18 | — |
| `TerminalLinkKind` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalOutput` | . | src/index.ts | — | non porté | 18 | — |
| `TerminalOutputLine` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalOutputProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalPalette` | . | src/index.ts | — | non porté | 1 | — |
| `TerminalSegment` | . | src/index.ts | — | non porté | 18 | — |
| `TerminalStatus` | . | src/index.ts | — | non porté | 6 | — |
| `TerminalStatusProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalStopControl` | . | src/index.ts | — | non porté | 7 | — |
| `TerminalStopControlProps` | . | src/index.ts | — | non porté | 0 | — |
| `TerminalView` | ./session | src/session.ts | — | non porté | 0 | — |
| `Textarea` | . | src/index.ts | — | non porté | 4 | — |
| `TextLink` | . | src/index.ts | — | non porté | 3 | — |
| `Theme` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `THEME_KEY_DEFINITION_BY_KEY` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `THEME_KEY_REGISTRY` | ./theme | src/theme/index.ts | — | non porté | 1 | — |
| `ThemeAppearance` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `themeFromToml` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `themeInitScript` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `ThemeKey` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeKeyDefinition` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeKeyRule` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeKeyStyle` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeKeyValue` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeMode` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeOverride` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeProvider` | ., ./blocks | src/index.ts | — | non porté | 17 | — |
| `ThemeSetting` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `ThemeToggle` | . | src/index.ts | — | non porté | 8 | — |
| `ThemeVariant` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `ThemeWarning` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `TimelineCalendar` | ./timeline-calendar | src/components/blocks/timeline-calendar.tsx | — | non porté | 8 | — |
| `toast` | . | src/index.ts | — | non porté | 7 | — |
| `Toast` | . | src/index.ts | — | non porté | 7 | — |
| `ToastAction` | . | src/index.ts | — | non porté | 7 | — |
| `ToastClose` | . | src/index.ts | — | non porté | 7 | — |
| `ToastContent` | . | src/index.ts | — | non porté | 7 | — |
| `ToastDescription` | . | src/index.ts | — | non porté | 7 | — |
| `Toaster` | . | src/index.ts | — | non porté | 7 | — |
| `ToastPortal` | . | src/index.ts | — | non porté | 7 | — |
| `ToastProvider` | . | src/index.ts | — | non porté | 7 | — |
| `ToastTitle` | . | src/index.ts | — | non porté | 7 | — |
| `ToastViewport` | . | src/index.ts | — | non porté | 7 | — |
| `TogetherMark` | . | src/index.ts | — | non porté | 3 | — |
| `Toggle` | . | src/index.ts | — | non porté | 7 | — |
| `ToggleGroup` | . | src/index.ts | — | non porté | 7 | — |
| `ToggleGroupItem` | . | src/index.ts | — | non porté | 7 | — |
| `toggleVariants` | ., ./variants | src/index.ts | — | non porté | 0 | — |
| `toHsv` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `TOOL_KIND_ICON` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolCallCard` | ./session | src/session.ts | — | non porté | 16 | — |
| `ToolCallCardLabels` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolCallCardProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolCallView` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolKind` | ./session | src/session.ts | — | non porté | 0 | — |
| `toolKindOf` | ./session | src/session.ts | — | non porté | 0 | — |
| `ToolStatus` | ./session | src/session.ts | — | non porté | 0 | — |
| `Tooltip` | . | src/index.ts | — | non porté | 7 | — |
| `TOOLTIP_EASE` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_FADE_IN_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_FADE_OUT_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_OPEN_DELAY` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_SLIDE_MS` | . | src/index.ts | — | non porté | 0 | — |
| `TOOLTIP_WARM_WINDOW` | . | src/index.ts | — | non porté | 0 | — |
| `TooltipContent` | . | src/index.ts | — | non porté | 7 | — |
| `TooltipProvider` | . | src/index.ts | — | non porté | 7 | — |
| `TooltipTrigger` | . | src/index.ts | — | non porté | 7 | — |
| `TraceAuthor` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `TraceAvatar` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `TraceCheckpoint` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `TraceDensity` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `TraceGroupBy` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `TraceLabels` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `TraceRange` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 0 | — |
| `TraceSession` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `TraceZoom` | ./checkpoint-trace | src/components/blocks/checkpoint-trace.tsx | — | non porté | 19 | — |
| `transcriptRows` | . | src/index.ts | — | non porté | 21 | — |
| `TRANSITION_ALL_RULE` | ./ratchet | src/ratchet/index.ts | — | non porté | 0 | — |
| `TrashGlyph` | . | src/index.ts | — | non porté | 3 | — |
| `TurnRow` | ./session | src/session.ts | — | non porté | 23 | — |
| `TurnRowProps` | ./session | src/session.ts | — | non porté | 0 | — |
| `TurnView` | ./session | src/session.ts | — | non porté | 0 | — |
| `UI_SCALE_DEFAULT` | . | src/index.ts | — | non porté | 0 | — |
| `UI_SCALE_MAX` | . | src/index.ts | — | non porté | 6 | — |
| `UI_SCALE_MIN` | . | src/index.ts | — | non porté | 6 | — |
| `UI_SCALE_PRESETS` | . | src/index.ts | — | non porté | 0 | — |
| `UI_SCALE_STEP` | . | src/index.ts | — | non porté | 0 | — |
| `UiScaleControl` | . | src/index.ts | — | non porté | 14 | — |
| `UiScalePanel` | . | src/index.ts | — | non porté | 6 | — |
| `UiScaleShortcuts` | . | src/index.ts | — | non porté | 0 | — |
| `UnderlineTabOption` | . | src/index.ts | — | non porté | 5 | — |
| `UnderlineTabs` | . | src/index.ts | — | non porté | 5 | — |
| `unreadBadge` | . | src/index.ts | — | non porté | 0 | — |
| `UploadIcon` | . | src/index.ts | — | non porté | 4 | — |
| `UploadIconHandle` | . | src/index.ts | — | non porté | 3 | — |
| `useComboboxAnchor` | . | src/index.ts | — | non porté | 12 | — |
| `useCommandMenu` | . | src/index.ts | — | non porté | 6 | — |
| `useLinks` | . | src/index.ts | — | non porté | 0 | — |
| `useListHighlight` | . | src/index.ts | — | non porté | 15 | — |
| `useMeasure` | . | src/index.ts | — | non porté | 0 | — |
| `useScrollEdges` | . | src/index.ts | — | non porté | 2 | — |
| `useSidebar` | . | src/index.ts | — | non porté | 6 | — |
| `useSideDock` | . | src/index.ts | — | non porté | 15 | — |
| `useSideDockRoom` | . | src/index.ts | — | non porté | 15 | — |
| `useTheme` | ., ./blocks | src/index.ts | — | non porté | 0 | — |
| `useToastManager` | . | src/index.ts | — | non porté | 7 | — |
| `useWindow` | ./session | src/session.ts | — | non porté | 0 | — |
| `VoyageMark` | . | src/index.ts | — | non porté | 3 | — |
| `withAlpha` | ./theme | src/theme/index.ts | — | non porté | 0 | — |
| `XAIMark` | . | src/index.ts | — | non porté | 3 | — |
| `XMark` | . | src/index.ts | — | non porté | 8 | — |
| `ZedMark` | . | src/index.ts | — | non porté | 8 | — |
| `ZhipuMark` | . | src/index.ts | — | non porté | 3 | — |

## Stories

| id | Titre | Fichier | Svelte | Statut | Preuves | Propriétaire |
|---|---|---|---|---|---|---|
| `foundations-principles--page` | Foundations/Principles / Page | stories/foundations/principles.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-colour--page` | Foundations/Colour / Page | stories/foundations/colour.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-type--page` | Foundations/Type / Page | stories/foundations/type.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-control-heights--page` | Foundations/Control heights / Page | stories/foundations/control-heights.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-spacing--page` | Foundations/Spacing / Page | stories/foundations/spacing.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-radius--page` | Foundations/Radius / Page | stories/foundations/radius.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-elevation--page` | Foundations/Elevation / Page | stories/foundations/elevation.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-z-index--page` | Foundations/Z-index / Page | stories/foundations/z-index.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-motion--page` | Foundations/Motion / Page | stories/foundations/motion.stories.tsx | — | non porté | — | B/C — à répartir |
| `foundations-icons--page` | Foundations/Icons / Page | stories/foundations/icons.stories.tsx | — | non porté | — | B/C — à répartir |
| `primitives-animatedicon--off` | Primitives/AnimatedIcon / Off | stories/ui/animated-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-animatedicon--on` | Primitives/AnimatedIcon / On | stories/ui/animated-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-animatedicon--one-shots` | Primitives/AnimatedIcon / One Shots | stories/ui/animated-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-badge--default` | Primitives/Badge / Default | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-badge--variants` | Primitives/Badge / Variants | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--variants | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-badge--sizes` | Primitives/Badge / Sizes | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--sizes | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-badge--with-icon` | Primitives/Badge / With Icon | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--with-icon | vérifié | 0/2 identiques, max 0.000 % | lot témoin |
| `primitives-badge--long-text` | Primitives/Badge / Long Text | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-badge--empty` | Primitives/Badge / Empty | stories/ui/badge.stories.tsx | gallery ?story=primitives-badge--empty | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--default` | Primitives/Button / Default | stories/ui/button.stories.tsx | gallery ?story=primitives-button--default | vérifié | 34/34 identiques, max 0.000 % | lot témoin |
| `primitives-button--variants` | Primitives/Button / Variants | stories/ui/button.stories.tsx | gallery ?story=primitives-button--variants | vérifié | 8/8 identiques, max 0.000 % | lot témoin |
| `primitives-button--sizes` | Primitives/Button / Sizes | stories/ui/button.stories.tsx | gallery ?story=primitives-button--sizes | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--secondary` | Primitives/Button / Secondary | stories/ui/button.stories.tsx | gallery ?story=primitives-button--secondary | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--outline` | Primitives/Button / Outline | stories/ui/button.stories.tsx | gallery ?story=primitives-button--outline | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--ghost` | Primitives/Button / Ghost | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--destructive` | Primitives/Button / Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--destructive | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--ghost-destructive` | Primitives/Button / Ghost Destructive | stories/ui/button.stories.tsx | gallery ?story=primitives-button--ghost-destructive | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--disabled` | Primitives/Button / Disabled | stories/ui/button.stories.tsx | gallery ?story=primitives-button--disabled | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--loading` | Primitives/Button / Loading | stories/ui/button.stories.tsx | gallery ?story=primitives-button--loading | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--with-icon` | Primitives/Button / With Icon | stories/ui/button.stories.tsx | gallery ?story=primitives-button--with-icon | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--pressed` | Primitives/Button / Pressed | stories/ui/button.stories.tsx | gallery ?story=primitives-button--pressed | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-button--long-text` | Primitives/Button / Long Text | stories/ui/button.stories.tsx | gallery ?story=primitives-button--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-colorpicker--default` | Primitives/ColorPicker / Default | stories/ui/color-picker.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-colorpicker--red` | Primitives/ColorPicker / Red | stories/ui/color-picker.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-colorpicker--black` | Primitives/ColorPicker / Black | stories/ui/color-picker.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-colorpicker--hue-slider-alone` | Primitives/ColorPicker / Hue Slider Alone | stories/ui/color-picker.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--default` | Primitives/Command / Default | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--open` | Primitives/Command / Open | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--empty` | Primitives/Command / Empty | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--disabled-row` | Primitives/Command / Disabled Row | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--compact` | Primitives/Command / Compact | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-command--compact-without-roles` | Primitives/Command / Compact Without Roles | stories/ui/command.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-contextmenu--default` | Primitives/ContextMenu / Default | stories/ui/context-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-contextmenu--open` | Primitives/ContextMenu / Open | stories/ui/context-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-contextmenu--disabled-item` | Primitives/ContextMenu / Disabled Item | stories/ui/context-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-contextmenu--exit` | Primitives/ContextMenu / Exit | stories/ui/context-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dialog--default` | Primitives/Dialog / Default | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--open` | Primitives/Dialog / Open | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--open | vérifié | 40/40 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--destructive` | Primitives/Dialog / Destructive | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--destructive | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--without-close-button` | Primitives/Dialog / Without Close Button | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--without-close-button | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--long-text` | Primitives/Dialog / Long Text | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--media` | Primitives/Dialog / Media | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--media | vérifié | 8/8 identiques, max 0.000 % | lot témoin |
| `primitives-dialog--large-blurred` | Primitives/Dialog / Large Blurred | stories/ui/dialog.stories.tsx | gallery ?story=primitives-dialog--large-blurred | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `primitives-dropdownmenu--default` | Primitives/DropdownMenu / Default | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--open` | Primitives/DropdownMenu / Open | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--icon-rows-align` | Primitives/DropdownMenu / Icon Rows Align | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--disabled-item` | Primitives/DropdownMenu / Disabled Item | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--long-text` | Primitives/DropdownMenu / Long Text | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--exit` | Primitives/DropdownMenu / Exit | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-dropdownmenu--recipes` | Primitives/DropdownMenu / Recipes | stories/ui/dropdown-menu.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-hintgroup--default` | Primitives/HintGroup / Default | stories/ui/hint-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-hintgroup--opens-upward` | Primitives/HintGroup / Opens Upward | stories/ui/hint-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-hintgroup--with-disabled` | Primitives/HintGroup / With Disabled | stories/ui/hint-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--default` | Primitives/IconButton / Default | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--variants` | Primitives/IconButton / Variants | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--sizes` | Primitives/IconButton / Sizes | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--ghost-destructive` | Primitives/IconButton / Ghost Destructive | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--active` | Primitives/IconButton / Active | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--pressed` | Primitives/IconButton / Pressed | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--round-stepper` | Primitives/IconButton / Round Stepper | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--disabled` | Primitives/IconButton / Disabled | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--with-hint` | Primitives/IconButton / With Hint | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--element-icon` | Primitives/IconButton / Element Icon | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--tile-remove` | Primitives/IconButton / Tile Remove | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--floating` | Primitives/IconButton / Floating | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-iconbutton--loading` | Primitives/IconButton / Loading | stories/ui/icon-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-icon--default` | Primitives/Icon / Default | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-icon--sizes` | Primitives/Icon / Sizes | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--sizes | écart identifié | 1/2 identiques, max 0.002 % | lot témoin |
| `primitives-icon--muted` | Primitives/Icon / Muted | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--muted | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-icon--beside-text` | Primitives/Icon / Beside Text | stories/ui/icon.stories.tsx | gallery ?story=primitives-icon--beside-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-input--default` | Primitives/Input / Default | stories/ui/input.stories.tsx | gallery ?story=primitives-input--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-input--filled` | Primitives/Input / Filled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--filled | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-input--sizes` | Primitives/Input / Sizes | stories/ui/input.stories.tsx | gallery ?story=primitives-input--sizes | vérifié | 8/8 identiques, max 0.000 % | lot témoin |
| `primitives-input--disabled` | Primitives/Input / Disabled | stories/ui/input.stories.tsx | gallery ?story=primitives-input--disabled | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-input--invalid` | Primitives/Input / Invalid | stories/ui/input.stories.tsx | gallery ?story=primitives-input--invalid | vérifié | 34/34 identiques, max 0.000 % | lot témoin |
| `primitives-input--long-text` | Primitives/Input / Long Text | stories/ui/input.stories.tsx | gallery ?story=primitives-input--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-input--with-icon` | Primitives/Input / With Icon | stories/ui/input.stories.tsx | gallery ?story=primitives-input--with-icon | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--default` | Primitives/Kbd / Default | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--default | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--sizes` | Primitives/Kbd / Sizes | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--sizes | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--combo` | Primitives/Kbd / Combo | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--combo | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--variants` | Primitives/Kbd / Variants | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--variants | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--platforms` | Primitives/Kbd / Platforms | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--platforms | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-kbd--long-text` | Primitives/Kbd / Long Text | stories/ui/kbd.stories.tsx | gallery ?story=primitives-kbd--long-text | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `primitives-popover--default` | Primitives/Popover / Default | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--open` | Primitives/Popover / Open | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--with-arrow` | Primitives/Popover / With Arrow | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--tinted` | Primitives/Popover / Tinted | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--glass` | Primitives/Popover / Glass | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--long-text` | Primitives/Popover / Long Text | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-popover--exit` | Primitives/Popover / Exit | stories/ui/popover.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-scrollarea--default` | Primitives/ScrollArea / Default | stories/ui/scroll-area.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-scrollarea--empty` | Primitives/ScrollArea / Empty | stories/ui/scroll-area.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-scrollfade--default` | Primitives/ScrollFade / Default | stories/ui/scroll-fade.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-scrollfade--short-list` | Primitives/ScrollFade / Short List | stories/ui/scroll-fade.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-secretinput--empty` | Primitives/SecretInput / Empty | stories/ui/secret-input.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-secretinput--configured` | Primitives/SecretInput / Configured | stories/ui/secret-input.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-secretinput--custom-placeholder` | Primitives/SecretInput / Custom Placeholder | stories/ui/secret-input.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-secretinput--disabled` | Primitives/SecretInput / Disabled | stories/ui/secret-input.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-secretinput--invalid` | Primitives/SecretInput / Invalid | stories/ui/secret-input.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--default` | Primitives/Segmented / Default | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--small` | Primitives/Segmented / Small | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--disabled` | Primitives/Segmented / Disabled | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--no-selection` | Primitives/Segmented / No Selection | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--with-icon` | Primitives/Segmented / With Icon | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--icon-only` | Primitives/Segmented / Icon Only | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--node-labels` | Primitives/Segmented / Node Labels | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-segmented--long-text` | Primitives/Segmented / Long Text | stories/ui/segmented.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--default` | Primitives/Select / Default | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--open` | Primitives/Select / Open | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--exit` | Primitives/Select / Exit | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--ghost` | Primitives/Select / Ghost | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--pill` | Primitives/Select / Pill | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--small` | Primitives/Select / Small | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--disabled` | Primitives/Select / Disabled | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--placeholder` | Primitives/Select / Placeholder | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--with-label` | Primitives/Select / With Label | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--empty` | Primitives/Select / Empty | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--with-icon` | Primitives/Select / With Icon | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--no-indicator` | Primitives/Select / No Indicator | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-select--long-text` | Primitives/Select / Long Text | stories/ui/select.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-slider--default` | Primitives/Slider / Default | stories/ui/slider.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-slider--minimum` | Primitives/Slider / Minimum | stories/ui/slider.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-slider--maximum` | Primitives/Slider / Maximum | stories/ui/slider.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-slider--stepped` | Primitives/Slider / Stepped | stories/ui/slider.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-slider--disabled` | Primitives/Slider / Disabled | stories/ui/slider.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-splitbutton--default` | Primitives/SplitButton / Default | stories/ui/split-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-splitbutton--busy` | Primitives/SplitButton / Busy | stories/ui/split-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-splitbutton--disabled` | Primitives/SplitButton / Disabled | stories/ui/split-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-splitbutton--open` | Primitives/SplitButton / Open | stories/ui/split-button.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--off` | Primitives/Switch / Off | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--on` | Primitives/Switch / On | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--mixed` | Primitives/Switch / Mixed | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--small` | Primitives/Switch / Small | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--disabled` | Primitives/Switch / Disabled | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--check-appearance` | Primitives/Switch / Check Appearance | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-switch--in-a-settings-row` | Primitives/Switch / In A Settings Row | stories/ui/switch.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--default` | Primitives/Tooltip / Default | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--open` | Primitives/Tooltip / Open | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--open-below` | Primitives/Tooltip / Open Below | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--long-text` | Primitives/Tooltip / Long Text | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--hint-row` | Primitives/Tooltip / Hint Row | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--hint-keycaps` | Primitives/Tooltip / Hint Keycaps | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `primitives-tooltip--exit` | Primitives/Tooltip / Exit | stories/ui/tooltip.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-ditherfield--default` | Components/DitherField / Default | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-ditherfield--dots` | Components/DitherField / Dots | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-ditherfield--recoloured` | Components/DitherField / Recoloured | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-ditherfield--inside-theme-provider` | Components/DitherField / Inside Theme Provider | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-ditherfield--with-copy` | Components/DitherField / With Copy | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-ditherfield--no-canvas` | Components/DitherField / No Canvas | stories/components/blocks/dither-field.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-logomarquee--default` | Components/LogoMarquee / Default | stories/components/blocks/logo-marquee.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-logomarquee--marks` | Components/LogoMarquee / Marks | stories/components/blocks/logo-marquee.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-logomarquee--no-label` | Components/LogoMarquee / No Label | stories/components/blocks/logo-marquee.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-logomarquee--many-items` | Components/LogoMarquee / Many Items | stories/components/blocks/logo-marquee.stories.tsx | — | non porté | — | C — blocs optionnels |
| `components-accordion--default` | Components/Accordion / Default | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-accordion--open` | Components/Accordion / Open | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-accordion--multiple` | Components/Accordion / Multiple | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-accordion--disabled` | Components/Accordion / Disabled | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-accordion--long-text` | Components/Accordion / Long Text | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-accordion--many-items` | Components/Accordion / Many Items | stories/components/ui/accordion.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-agenticon--external-monochrome` | Components/AgentIcon / External Monochrome | stories/components/ui/agent-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-agenticon--external-colour` | Components/AgentIcon / External Colour | stories/components/ui/agent-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-agenticon--monogram` | Components/AgentIcon / Monogram | stories/components/ui/agent-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--default` | Components/AlertDialog / Default | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--open` | Components/AlertDialog / Open | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--not-destructive` | Components/AlertDialog / Not Destructive | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--long-text` | Components/AlertDialog / Long Text | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--parts` | Components/AlertDialog / Parts | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-alertdialog--blurred-dismissible` | Components/AlertDialog / Blurred Dismissible | stories/components/ui/alert-dialog.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--default` | Components/AtlasMark / Default | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--sizes` | Components/AtlasMark / Sizes | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--inks` | Components/AtlasMark / Inks | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--badge` | Components/AtlasMark / Badge | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--wordmark` | Components/AtlasMark / Wordmark | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--badge-tones` | Components/AtlasMark / Badge Tones | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-atlasmark--lockups` | Components/AtlasMark / Lockups | stories/components/ui/atlas-mark.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatarstack--default` | Components/AvatarStack / Default | stories/components/ui/avatar-stack.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatarstack--empty` | Components/AvatarStack / Empty | stories/components/ui/avatar-stack.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatarstack--single` | Components/AvatarStack / Single | stories/components/ui/avatar-stack.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatarstack--large` | Components/AvatarStack / Large | stories/components/ui/avatar-stack.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatarstack--many-items` | Components/AvatarStack / Many Items | stories/components/ui/avatar-stack.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--default` | Components/Avatar / Default | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--with-image` | Components/Avatar / With Image | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--error-state` | Components/Avatar / Error | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--sizes` | Components/Avatar / Sizes | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--group` | Components/Avatar / Group | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-avatar--many-items` | Components/Avatar / Many Items | stories/components/ui/avatar.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--social` | Components/BrandMarks / Social | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--agents` | Components/BrandMarks / Agents | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--models` | Components/BrandMarks / Models | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--editors` | Components/BrandMarks / Editors | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--sizes` | Components/BrandMarks / Sizes | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--on-card` | Components/BrandMarks / On Card | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--titled-model-marks` | Components/BrandMarks / Titled Model Marks | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-brandmarks--in-buttons` | Components/BrandMarks / In Buttons | stories/components/ui/brand-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-breadcrumb--default` | Components/Breadcrumb / Default | stories/components/ui/breadcrumb.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-breadcrumb--single` | Components/Breadcrumb / Single | stories/components/ui/breadcrumb.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-breadcrumb--collapsed` | Components/Breadcrumb / Collapsed | stories/components/ui/breadcrumb.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-breadcrumb--many-items` | Components/Breadcrumb / Many Items | stories/components/ui/breadcrumb.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-breadcrumb--long-text` | Components/Breadcrumb / Long Text | stories/components/ui/breadcrumb.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--default` | Components/Callout / Default | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--tones` | Components/Callout / Tones | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--error-state` | Components/Callout / Error | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--with-action` | Components/Callout / With Action | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--custom-icon` | Components/Callout / Custom Icon | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--no-icon` | Components/Callout / No Icon | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--long-text` | Components/Callout / Long Text | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--recipe` | Components/Callout / Recipe | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--tucked` | Components/Callout / Tucked | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--tucked-tones` | Components/Callout / Tucked Tones | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-callout--animated` | Components/Callout / Animated | stories/components/ui/callout.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--default` | Components/Checkbox / Default | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--checked` | Components/Checkbox / Checked | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--indeterminate` | Components/Checkbox / Indeterminate | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--disabled` | Components/Checkbox / Disabled | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--error-state` | Components/Checkbox / Error | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--long-text` | Components/Checkbox / Long Text | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-checkbox--many-items` | Components/Checkbox / Many Items | stories/components/ui/checkbox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--default` | Components/Code / Default | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--in-sentence` | Components/Code / In Sentence | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--block` | Components/Code / Block | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--long-text` | Components/Code / Long Text | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--diff` | Components/Code / Diff | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--diff-options` | Components/Code / Diff Options | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-code--fence` | Components/Code / Fence | stories/components/ui/code-block.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-collapsible--default` | Components/Collapsible / Default | stories/components/ui/collapsible.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-collapsible--open` | Components/Collapsible / Open | stories/components/ui/collapsible.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-collapsible--disabled` | Components/Collapsible / Disabled | stories/components/ui/collapsible.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-collapsible--many-items` | Components/Collapsible / Many Items | stories/components/ui/collapsible.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--default` | Components/Combobox / Default | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--open` | Components/Combobox / Open | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--with-clear` | Components/Combobox / With Clear | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--disabled` | Components/Combobox / Disabled | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--empty` | Components/Combobox / Empty | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--many-items` | Components/Combobox / Many Items | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--long-text` | Components/Combobox / Long Text | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--grouped` | Components/Combobox / Grouped | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--button-trigger` | Components/Combobox / Button Trigger | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--chips` | Components/Combobox / Chips | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--chips-open` | Components/Combobox / Chips Open | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-combobox--exit` | Components/Combobox / Exit | stories/components/ui/combobox.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--default` | Components/EmptyState / Default | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--with-action` | Components/EmptyState / With Action | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--title-only` | Components/EmptyState / Title Only | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--no-results` | Components/EmptyState / No Results | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--long-text` | Components/EmptyState / Long Text | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-emptystate--custom-icon` | Components/EmptyState / Custom Icon | stories/components/ui/empty-state.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--default` | Components/Field / Default | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--disabled` | Components/Field / Disabled | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--error-state` | Components/Field / Error | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--long-text` | Components/Field / Long Text | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--horizontal` | Components/Field / Horizontal | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--form` | Components/Field / Form | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--choice-card` | Components/Field / Choice Card | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-field--many-errors` | Components/Field / Many Errors | stories/components/ui/field.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-gochevron--default` | Components/GoChevron / Default | stories/components/ui/go-chevron.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-gochevron--bare` | Components/GoChevron / Bare | stories/components/ui/go-chevron.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-gochevron--long-text` | Components/GoChevron / Long Text | stories/components/ui/go-chevron.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-gochevron--many-items` | Components/GoChevron / Many Items | stories/components/ui/go-chevron.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--default` | Components/InputGroup / Default | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--disabled` | Components/InputGroup / Disabled | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--autofocused` | Components/InputGroup / Autofocused | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--clicked` | Components/InputGroup / Clicked | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--error` | Components/InputGroup / Error | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--long-text` | Components/InputGroup / Long Text | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--with-button` | Components/InputGroup / With Button | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--with-text` | Components/InputGroup / With Text | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-inputgroup--textarea` | Components/InputGroup / Textarea | stories/components/ui/input-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-label--default` | Components/Label / Default | stories/components/ui/label.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-label--with-input` | Components/Label / With Input | stories/components/ui/label.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-label--with-checkbox` | Components/Label / With Checkbox | stories/components/ui/label.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-label--disabled` | Components/Label / Disabled | stories/components/ui/label.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-label--long-text` | Components/Label / Long Text | stories/components/ui/label.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-mailboxicon--default` | Components/MailboxIcon / Default | stories/components/ui/mailbox-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-mailboxicon--sizes` | Components/MailboxIcon / Sizes | stories/components/ui/mailbox-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-mailboxicon--driven-by-parent` | Components/MailboxIcon / Driven By Parent | stories/components/ui/mailbox-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-messagesquaremoreicon--default` | Components/MessageSquareMoreIcon / Default | stories/components/ui/message-square-more-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-messagesquaremoreicon--sizes` | Components/MessageSquareMoreIcon / Sizes | stories/components/ui/message-square-more-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-messagesquaremoreicon--driven-by-parent` | Components/MessageSquareMoreIcon / Driven By Parent | stories/components/ui/message-square-more-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--default` | Components/ModelBadge / Default | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--families` | Components/ModelBadge / Families | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--sizes` | Components/ModelBadge / Sizes | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--unknown` | Components/ModelBadge / Unknown | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--explicit-family` | Components/ModelBadge / Explicit Family | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--long-name` | Components/ModelBadge / Long Name | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-modelbadge--marks` | Components/ModelBadge / Marks | stories/components/ui/model-badge.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--default` | Components/Pill / Default | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--with-icon` | Components/Pill / With Icon | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--removable` | Components/Pill / Removable | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--status-dots` | Components/Pill / Status Dots | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--many-items` | Components/Pill / Many Items | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--long-text` | Components/Pill / Long Text | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--as-button` | Components/Pill / As Button | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--sizes` | Components/Pill / Sizes | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--trailing-action` | Components/Pill / Trailing Action | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-pill--raised` | Components/Pill / Raised | stories/components/ui/pill.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--default` | Components/Progress / Default | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--empty` | Components/Progress / Empty | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--complete` | Components/Progress / Complete | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--loading` | Components/Progress / Loading | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--long-text` | Components/Progress / Long Text | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--bare-track` | Components/Progress / Bare Track | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--tones` | Components/Progress / Tones | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-progress--many-items` | Components/Progress / Many Items | stories/components/ui/progress.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-providermarks--all` | Components/ProviderMarks / All | stories/components/ui/provider-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-providermarks--desktop-sizes` | Components/ProviderMarks / Desktop Sizes | stories/components/ui/provider-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-providermarks--on-card` | Components/ProviderMarks / On Card | stories/components/ui/provider-marks.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-radiogroup--default` | Components/RadioGroup / Default | stories/components/ui/radio-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-radiogroup--disabled` | Components/RadioGroup / Disabled | stories/components/ui/radio-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-radiogroup--error` | Components/RadioGroup / Error | stories/components/ui/radio-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-radiogroup--long-text` | Components/RadioGroup / Long Text | stories/components/ui/radio-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-radiogroup--many-items` | Components/RadioGroup / Many Items | stories/components/ui/radio-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-separator--default` | Components/Separator / Default | stories/components/ui/separator.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-separator--strong` | Components/Separator / Strong | stories/components/ui/separator.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-separator--vertical` | Components/Separator / Vertical | stories/components/ui/separator.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-sheet--default` | Components/Sheet / Default | stories/components/ui/sheet.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-sheet--open` | Components/Sheet / Open | stories/components/ui/sheet.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-sheet--left` | Components/Sheet / Left | stories/components/ui/sheet.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-sheet--bottom` | Components/Sheet / Bottom | stories/components/ui/sheet.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-sheet--long-text` | Components/Sheet / Long Text | stories/components/ui/sheet.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-skeleton--default` | Components/Skeleton / Default | stories/components/ui/skeleton.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-skeleton--loading` | Components/Skeleton / Loading | stories/components/ui/skeleton.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-skeleton--static-panel` | Components/Skeleton / Static Panel | stories/components/ui/skeleton.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-skeleton--card` | Components/Skeleton / Card | stories/components/ui/skeleton.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-spinner--default` | Components/Spinner / Default | stories/components/ui/spinner.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-spinner--sizes` | Components/Spinner / Sizes | stories/components/ui/spinner.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-spinner--in-button` | Components/Spinner / In Button | stories/components/ui/spinner.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-spinner--with-text` | Components/Spinner / With Text | stories/components/ui/spinner.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusdot--default` | Components/StatusDot / Default | stories/components/ui/status-dot.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusdot--tones` | Components/StatusDot / Tones | stories/components/ui/status-dot.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusdot--sizes` | Components/StatusDot / Sizes | stories/components/ui/status-dot.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusdot--presence` | Components/StatusDot / Presence | stories/components/ui/status-dot.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusdot--on-an-icon` | Components/StatusDot / On An Icon | stories/components/ui/status-dot.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusicon--default` | Components/StatusIcon / Default | stories/components/ui/status-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusicon--error` | Components/StatusIcon / Error | stories/components/ui/status-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusicon--all-statuses` | Components/StatusIcon / All Statuses | stories/components/ui/status-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusicon--priorities` | Components/StatusIcon / Priorities | stories/components/ui/status-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-statusicon--many-items` | Components/StatusIcon / Many Items | stories/components/ui/status-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-steplist--running` | Components/StepList / Running | stories/components/ui/step-list.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-steplist--starting` | Components/StepList / Starting | stories/components/ui/step-list.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-steplist--done` | Components/StepList / Done | stories/components/ui/step-list.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-steplist--failed` | Components/StepList / Failed | stories/components/ui/step-list.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-steplist--live` | Components/StepList / Live | stories/components/ui/step-list.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--default` | Components/Table / Default | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--with-footer` | Components/Table / With Footer | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--selected` | Components/Table / Selected | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--empty` | Components/Table / Empty | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--long-text` | Components/Table / Long Text | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-table--many-items` | Components/Table / Many Items | stories/components/ui/table.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--default` | Components/Tabs / Default | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--small` | Components/Tabs / Small | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--segmented-with-icons` | Components/Tabs / Segmented With Icons | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--line` | Components/Tabs / Line | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--disabled` | Components/Tabs / Disabled | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--long-text` | Components/Tabs / Long Text | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tabs--many-items` | Components/Tabs / Many Items | stories/components/ui/tabs.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--default` | Components/Tag / Default | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--with-dot` | Components/Tag / With Dot | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--no-hue` | Components/Tag / No Hue | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--all-hues` | Components/Tag / All Hues | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--every-theme` | Components/Tag / Every Theme | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--label-marks` | Components/Tag / Label Marks | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--dots` | Components/Tag / Dots | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-tag--long-text` | Components/Tag / Long Text | stories/components/ui/tag.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textlink--default` | Components/TextLink / Default | stories/components/ui/text-link.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textlink--muted` | Components/TextLink / Muted | stories/components/ui/text-link.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textlink--standalone-and-prose` | Components/TextLink / Standalone And Prose | stories/components/ui/text-link.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textarea--default` | Components/Textarea / Default | stories/components/ui/textarea.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textarea--disabled` | Components/Textarea / Disabled | stories/components/ui/textarea.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textarea--error` | Components/Textarea / Error | stories/components/ui/textarea.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-textarea--long-text` | Components/Textarea / Long Text | stories/components/ui/textarea.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--default` | Components/Toast / Default | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--open` | Components/Toast / Open | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--error` | Components/Toast / Error | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--loading` | Components/Toast / Loading | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--many-items` | Components/Toast / Many Items | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--long-text` | Components/Toast / Long Text | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toast--composition` | Components/Toast / Composition | stories/components/ui/toast.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--default` | Components/ToggleGroup / Default | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--outline` | Components/ToggleGroup / Outline | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--joined` | Components/ToggleGroup / Joined | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--vertical` | Components/ToggleGroup / Vertical | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--disabled` | Components/ToggleGroup / Disabled | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--multiple` | Components/ToggleGroup / Multiple | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-togglegroup--with-text` | Components/ToggleGroup / With Text | stories/components/ui/toggle-group.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--default` | Components/Toggle / Default | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--pressed` | Components/Toggle / Pressed | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--outline` | Components/Toggle / Outline | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--disabled` | Components/Toggle / Disabled | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--with-icon` | Components/Toggle / With Icon | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--sizes` | Components/Toggle / Sizes | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-toggle--long-text` | Components/Toggle / Long Text | stories/components/ui/toggle.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-uploadicon--default` | Components/UploadIcon / Default | stories/components/ui/upload-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-uploadicon--sizes` | Components/UploadIcon / Sizes | stories/components/ui/upload-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `components-uploadicon--driven-by-parent` | Components/UploadIcon / Driven By Parent | stories/components/ui/upload-icon.stories.tsx | — | non porté | — | B — primitives et formulaires |
| `patterns-terminalcommandinput--idle` | Patterns/TerminalCommandInput / Idle | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-terminalcommandinput--busy` | Patterns/TerminalCommandInput / Busy | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-terminalcommandinput--raw-mode` | Patterns/TerminalCommandInput / Raw Mode | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-terminalcommandinput--with-status` | Patterns/TerminalCommandInput / With Status | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-terminalcommandinput--suggestions` | Patterns/TerminalCommandInput / Suggestions | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-terminalcommandinput--narrow-status` | Patterns/TerminalCommandInput / Narrow Status | stories/components/code-surface/command-input.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandsuggestions--default` | Patterns/CommandSuggestions / Default | stories/components/code-surface/command-suggestions.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-editorbreadcrumbs--short` | Patterns/EditorBreadcrumbs / Short | stories/components/code-surface/editor-breadcrumbs.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorbreadcrumbs--collapsed` | Patterns/EditorBreadcrumbs / Collapsed | stories/components/code-surface/editor-breadcrumbs.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorbreadcrumbs--clickable` | Patterns/EditorBreadcrumbs / Clickable | stories/components/code-surface/editor-breadcrumbs.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--default` | Patterns/EditorFrame / Default | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--dirty` | Patterns/EditorFrame / Dirty | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--disk-changed` | Patterns/EditorFrame / Disk Changed | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--markdown-toggle` | Patterns/EditorFrame / Markdown Toggle | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--with-find` | Patterns/EditorFrame / With Find | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--with-replace` | Patterns/EditorFrame / With Replace | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--long-path` | Patterns/EditorFrame / Long Path | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorframe--phone` | Patterns/EditorFrame / Phone | stories/components/code-surface/editor-frame.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorpreview--all-syntax-roles` | Patterns/EditorPreview / All Syntax Roles | stories/components/code-surface/editor-preview.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorpreview--gutter` | Patterns/EditorPreview / Gutter | stories/components/code-surface/editor-preview.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorpreview--selection-and-matches` | Patterns/EditorPreview / Selection And Matches | stories/components/code-surface/editor-preview.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorstatusbar--default` | Patterns/EditorStatusBar / Default | stories/components/code-surface/editor-status-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorstatusbar--selection` | Patterns/EditorStatusBar / Selection | stories/components/code-surface/editor-status-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-editorstatusbar--clickable` | Patterns/EditorStatusBar / Clickable | stories/components/code-surface/editor-status-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--matches` | Patterns/FindBar / Matches | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--no-results` | Patterns/FindBar / No Results | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--invalid-regex` | Patterns/FindBar / Invalid Regex | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--replace` | Patterns/FindBar / Replace | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--find-only` | Patterns/FindBar / Find Only | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-findbar--select-all` | Patterns/FindBar / Select All | stories/components/code-surface/find-bar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--running` | Patterns/TerminalBlock / Running | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--succeeded` | Patterns/TerminalBlock / Succeeded | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--failed` | Patterns/TerminalBlock / Failed | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--collapsed` | Patterns/TerminalBlock / Collapsed | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--no-header` | Patterns/TerminalBlock / No Header | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--ansi-colours` | Patterns/TerminalBlock / Ansi Colours | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--hidden-lines` | Patterns/TerminalBlock / Hidden Lines | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--large-output-badge` | Patterns/TerminalBlock / Large Output Badge | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--password-prompt` | Patterns/TerminalBlock / Password Prompt | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--long-output` | Patterns/TerminalBlock / Long Output | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--from-tool-call` | Patterns/TerminalBlock / From Tool Call | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--session` | Patterns/TerminalBlock / Session | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--styled-runs` | Patterns/TerminalBlock / Styled Runs | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--links` | Patterns/TerminalBlock / Links | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--search-highlight` | Patterns/TerminalBlock / Search Highlight | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--inverse` | Patterns/TerminalBlock / Inverse | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--memoised-lines` | Patterns/TerminalBlock / Memoised Lines | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalblock--command-highlight` | Patterns/TerminalBlock / Command Highlight | stories/components/code-surface/terminal-block.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalpalette--default` | Patterns/TerminalPalette / Default | stories/components/code-surface/terminal-palette.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-terminalstopcontrol--ready` | Patterns/TerminalStopControl / Ready | stories/components/code-surface/terminal-stop-control.stories.tsx | — | non porté | — | C — surfaces de produit |
| `patterns-commandpalette--default` | Patterns/CommandPalette / Default | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--filtered` | Patterns/CommandPalette / Filtered | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--with-recent` | Patterns/CommandPalette / With Recent | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--nested-pages` | Patterns/CommandPalette / Nested Pages | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--disabled-items` | Patterns/CommandPalette / Disabled Items | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--loading` | Patterns/CommandPalette / Loading | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--loading-with-results` | Patterns/CommandPalette / Loading With Results | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--no-items` | Patterns/CommandPalette / No Items | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--no-matches` | Patterns/CommandPalette / No Matches | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--long-labels` | Patterns/CommandPalette / Long Labels | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--many-items` | Patterns/CommandPalette / Many Items | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--new-tab` | Patterns/CommandPalette / New Tab | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--view-only` | Patterns/CommandPalette / View Only | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--inline-list` | Patterns/CommandPalette / Inline List | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-commandpalette--rows` | Patterns/CommandPalette / Rows | stories/components/patterns/command-palette.stories.tsx | — | non porté | — | B — overlays et menus |
| `patterns-datatable--default` | Patterns/DataTable / Default | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--empty` | Patterns/DataTable / Empty | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--many-items` | Patterns/DataTable / Many Items | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--bare` | Patterns/DataTable / Bare | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--long-text` | Patterns/DataTable / Long Text | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--narrow` | Patterns/DataTable / Narrow | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-datatable--server-sorted` | Patterns/DataTable / Server Sorted | stories/components/patterns/data-table.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--default` | Patterns/DotMatrix / Default | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--empty` | Patterns/DotMatrix / Empty | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--with-gaps` | Patterns/DotMatrix / With Gaps | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--many-items` | Patterns/DotMatrix / Many Items | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--meter` | Patterns/DotMatrix / Meter | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--gauge` | Patterns/DotMatrix / Gauge | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-dotmatrix--meter-hues` | Patterns/DotMatrix / Meter Hues | stories/components/patterns/dot-matrix.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-hintoverlay--default` | Patterns/HintOverlay / Default | stories/components/patterns/hint-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-hintoverlay--open` | Patterns/HintOverlay / Open | stories/components/patterns/hint-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-hintoverlay--two-char-labels` | Patterns/HintOverlay / Two Char Labels | stories/components/patterns/hint-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-hintoverlay--scrolled` | Patterns/HintOverlay / Scrolled | stories/components/patterns/hint-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--default` | Patterns/KpiStrip / Default | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--no-previous-period` | Patterns/KpiStrip / No Previous Period | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--single` | Patterns/KpiStrip / Single | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--many-items` | Patterns/KpiStrip / Many Items | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--long-text` | Patterns/KpiStrip / Long Text | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--chips` | Patterns/KpiStrip / Chips | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--tones` | Patterns/KpiStrip / Tones | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-kpistrip--with-tones` | Patterns/KpiStrip / With Tones | stories/components/patterns/kpi-strip.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-nextpage--scrolling` | Patterns/NextPage / Scrolling | stories/components/patterns/next-page.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-nextpage--fails-once` | Patterns/NextPage / Fails Once | stories/components/patterns/next-page.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-nextpage--loading` | Patterns/NextPage / Loading | stories/components/patterns/next-page.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-nextpage--failed` | Patterns/NextPage / Failed | stories/components/patterns/next-page.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--default` | Patterns/Panel / Default | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--untitled` | Patterns/Panel / Untitled | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--with-actions` | Patterns/Panel / With Actions | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--empty` | Patterns/Panel / Empty | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--long-text` | Patterns/Panel / Long Text | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-panel--stagger` | Patterns/Panel / Stagger | stories/components/patterns/panel.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--default` | Patterns/PersonAvatar / Default | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--with-photo` | Patterns/PersonAvatar / With Photo | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--error` | Patterns/PersonAvatar / Error | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--email-only` | Patterns/PersonAvatar / Email Only | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--sizes` | Patterns/PersonAvatar / Sizes | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-personavatar--long-text` | Patterns/PersonAvatar / Long Text | stories/components/patterns/person-avatar.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-rail--default` | Patterns/Rail / Default | stories/components/patterns/rail.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--default` | Patterns/SearchOverlay / Default | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--find-in-files-idle` | Patterns/SearchOverlay / Find In Files Idle | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--find-in-files-no-recents` | Patterns/SearchOverlay / Find In Files No Recents | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--searching` | Patterns/SearchOverlay / Searching | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--results` | Patterns/SearchOverlay / Results | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--no-results` | Patterns/SearchOverlay / No Results | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--failed` | Patterns/SearchOverlay / Failed | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--find-in-chat` | Patterns/SearchOverlay / Find In Chat | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--many-results` | Patterns/SearchOverlay / Many Results | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-searchoverlay--result-rows` | Patterns/SearchOverlay / Result Rows | stories/components/patterns/search-overlay.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--default` | Patterns/SectionHeader / Default | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--title-only` | Patterns/SectionHeader / Title Only | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--with-action` | Patterns/SectionHeader / With Action | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--with-icon` | Patterns/SectionHeader / With Icon | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--long-text` | Patterns/SectionHeader / Long Text | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-sectionheader--page` | Patterns/SectionHeader / Page | stories/components/patterns/section-header.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-segmented--default` | Patterns/Segmented / Default | stories/components/patterns/segmented.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-segmented--many-items` | Patterns/Segmented / Many Items | stories/components/patterns/segmented.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-segmented--filters` | Patterns/Segmented / Filters | stories/components/patterns/segmented.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-segmented--icon-group` | Patterns/Segmented / Icon Group | stories/components/patterns/segmented.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-segmented--disabled` | Patterns/Segmented / Disabled | stories/components/patterns/segmented.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-settingcard--default` | Patterns/SettingCard / Default | stories/components/patterns/setting-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-settingcard--disabled` | Patterns/SettingCard / Disabled | stories/components/patterns/setting-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-settingcard--long-text` | Patterns/SettingCard / Long Text | stories/components/patterns/setting-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-settingcard--many-items` | Patterns/SettingCard / Many Items | stories/components/patterns/setting-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-settingcard--narrow` | Patterns/SettingCard / Narrow | stories/components/patterns/setting-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--default` | Patterns/StatCard / Default | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--with-badge` | Patterns/StatCard / With Badge | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--empty` | Patterns/StatCard / Empty | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--long-text` | Patterns/StatCard / Long Text | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--grid` | Patterns/StatCard / Grid | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--meters` | Patterns/StatCard / Meters | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `patterns-statcard--meter-no-hue` | Patterns/StatCard / Meter No Hue | stories/components/patterns/stat-card.stories.tsx | — | non porté | — | C — galerie et patterns |
| `blocks-checkpointtrace--org-week` | Blocks/CheckpointTrace / Org Week | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--keyboard` | Blocks/CheckpointTrace / Keyboard | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--pan-and-zoom` | Blocks/CheckpointTrace / Pan And Zoom | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--project-day` | Blocks/CheckpointTrace / Project Day | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--live` | Blocks/CheckpointTrace / Live | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--dense-clustering` | Blocks/CheckpointTrace / Dense Clustering | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--group-by-person` | Blocks/CheckpointTrace / Group By Person | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--group-by-project` | Blocks/CheckpointTrace / Group By Project | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--empty` | Blocks/CheckpointTrace / Empty | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--loading` | Blocks/CheckpointTrace / Loading | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--error-state` | Blocks/CheckpointTrace / Error State | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--error-with-retry` | Blocks/CheckpointTrace / Error With Retry | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--long-titles` | Blocks/CheckpointTrace / Long Titles | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--team-week` | Blocks/CheckpointTrace / Team Week | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--dense-clusters-with-titles` | Blocks/CheckpointTrace / Dense Clusters With Titles | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--mixed-titles` | Blocks/CheckpointTrace / Mixed Titles | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--compact` | Blocks/CheckpointTrace / Compact | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--many-sessions` | Blocks/CheckpointTrace / Many Sessions | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-checkpointtrace--placeholder-initials` | Blocks/CheckpointTrace / Placeholder Initials | stories/components/blocks/checkpoint-trace.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-dashedrails--default` | Blocks/DashedRails / Default | stories/components/blocks/dashed-rails.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-dashedrails--faded` | Blocks/DashedRails / Faded | stories/components/blocks/dashed-rails.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-dashedrails--fixed-offset` | Blocks/DashedRails / Fixed Offset | stories/components/blocks/dashed-rails.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-ghostcards--default` | Blocks/GhostCards / Default | stories/components/blocks/ghost-cards.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-ghostcards--long-text` | Blocks/GhostCards / Long Text | stories/components/blocks/ghost-cards.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--default` | Blocks/Globe / Default | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--empty` | Blocks/Globe / Empty | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--still` | Blocks/Globe / Still | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--long-text` | Blocks/Globe / Long Text | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--no-webgl` | Blocks/Globe / No Webgl | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-globe--custom-fallback` | Blocks/Globe / Custom Fallback | stories/components/blocks/globe.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-gradualblur--bottom` | Blocks/GradualBlur / Bottom | stories/components/blocks/gradual-blur.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-gradualblur--top` | Blocks/GradualBlur / Top | stories/components/blocks/gradual-blur.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-gradualblur--tinted` | Blocks/GradualBlur / Tinted | stories/components/blocks/gradual-blur.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-gradualblur--off` | Blocks/GradualBlur / Off | stories/components/blocks/gradual-blur.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-infiniteslider--default` | Blocks/InfiniteSlider / Default | stories/components/blocks/infinite-slider.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-infiniteslider--reverse` | Blocks/InfiniteSlider / Reverse | stories/components/blocks/infinite-slider.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-infiniteslider--vertical` | Blocks/InfiniteSlider / Vertical | stories/components/blocks/infinite-slider.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-infiniteslider--many-items` | Blocks/InfiniteSlider / Many Items | stories/components/blocks/infinite-slider.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-infiniteslider--capped` | Blocks/InfiniteSlider / Capped | stories/components/blocks/infinite-slider.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-plusdecorator--default` | Blocks/PlusDecorator / Default | stories/components/blocks/plus-decorator.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-plusdecorator--all-corners` | Blocks/PlusDecorator / All Corners | stories/components/blocks/plus-decorator.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-scrollrail--default` | Blocks/ScrollRail / Default | stories/components/blocks/scroll-rail.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-scrollrail--halfway` | Blocks/ScrollRail / Halfway | stories/components/blocks/scroll-rail.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-scrollrail--empty` | Blocks/ScrollRail / Empty | stories/components/blocks/scroll-rail.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--default` | Blocks/TimelineCalendar / Default | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--empty` | Blocks/TimelineCalendar / Empty | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--long-text` | Blocks/TimelineCalendar / Long Text | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--many-items` | Blocks/TimelineCalendar / Many Items | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--scrolled` | Blocks/TimelineCalendar / Scrolled | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--flush` | Blocks/TimelineCalendar / Flush | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--scrolled-to-end` | Blocks/TimelineCalendar / Scrolled To End | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-timelinecalendar--measured-end` | Blocks/TimelineCalendar / Measured End | stories/components/blocks/timeline-calendar.stories.tsx | — | non porté | — | C — blocs optionnels |
| `blocks-canvas-action-pill--alone` | Blocks/Canvas action pill / Alone | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--three-peers` | Blocks/Canvas action pill / Three Peers | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--overflow` | Blocks/Canvas action pill / Overflow | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--following` | Blocks/Canvas action pill / Following | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--followed-by` | Blocks/Canvas action pill / Followed By | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--exporting` | Blocks/Canvas action pill / Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--export-labelled` | Blocks/Canvas action pill / Export Labelled | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--export-labelled-exporting` | Blocks/Canvas action pill / Export Labelled Exporting | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-action-pill--export-only` | Blocks/Canvas action pill / Export Only | stories/components/canvas/canvas-action-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-board--spaces` | Blocks/Canvas board / Spaces | stories/components/canvas/canvas-board.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-board--local-canvas` | Blocks/Canvas board / Local Canvas | stories/components/canvas/canvas-board.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-board--empty-page` | Blocks/Canvas board / Empty Page | stories/components/canvas/canvas-board.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-board--phone` | Blocks/Canvas board / Phone | stories/components/canvas/canvas-board.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-chrome--pieces` | Blocks/Canvas chrome / Pieces | stories/components/canvas/canvas-chrome.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--live` | Blocks/Canvas header / Live | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--syncing` | Blocks/Canvas header / Syncing | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--offline` | Blocks/Canvas header / Offline | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--offline-error` | Blocks/Canvas header / Offline Error | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--archived` | Blocks/Canvas header / Archived | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--viewing` | Blocks/Canvas header / Viewing | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--local-canvas` | Blocks/Canvas header / Local Canvas | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--long-page-name` | Blocks/Canvas header / Long Page Name | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--page-switcher` | Blocks/Canvas header / Page Switcher | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-header--page-switcher-empty` | Blocks/Canvas header / Page Switcher Empty | stories/components/canvas/canvas-header-pill.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-minimap--default` | Blocks/Canvas minimap / Default | stories/components/canvas/canvas-minimap.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-minimap--empty` | Blocks/Canvas minimap / Empty | stories/components/canvas/canvas-minimap.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--note` | Blocks/Canvas nodes / Note | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--note-empty` | Blocks/Canvas nodes / Note Empty | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--note-selected` | Blocks/Canvas nodes / Note Selected | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--note-claimed` | Blocks/Canvas nodes / Note Claimed | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--note-editing` | Blocks/Canvas nodes / Note Editing | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--text` | Blocks/Canvas nodes / Text | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--shapes` | Blocks/Canvas nodes / Shapes | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--frame` | Blocks/Canvas nodes / Frame | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--media-loading` | Blocks/Canvas nodes / Media Loading | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--media-loading-labelled` | Blocks/Canvas nodes / Media Loading Labelled | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--media-error` | Blocks/Canvas nodes / Media Error | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--media-image` | Blocks/Canvas nodes / Media Image | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-nodes--selected-with-anchors` | Blocks/Canvas nodes / Selected With Anchors | stories/components/canvas/canvas-nodes.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--flat` | Blocks/Canvas pages panel / Flat | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--with-folders` | Blocks/Canvas pages panel / With Folders | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--collapsed` | Blocks/Canvas pages panel / Collapsed | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--single-page` | Blocks/Canvas pages panel / Single Page | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--empty` | Blocks/Canvas pages panel / Empty | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--long-names` | Blocks/Canvas pages panel / Long Names | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--drop-indicator-before` | Blocks/Canvas pages panel / Drop Indicator Before | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--drop-indicator-after` | Blocks/Canvas pages panel / Drop Indicator After | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--drop-indicator-into` | Blocks/Canvas pages panel / Drop Indicator Into | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--with-back-link` | Blocks/Canvas pages panel / With Back Link | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--rename` | Blocks/Canvas pages panel / Rename | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--with-authors` | Blocks/Canvas pages panel / With Authors | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--row-actions` | Blocks/Canvas pages panel / Row Actions | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--delete-always` | Blocks/Canvas pages panel / Delete Always | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--delete-always-last-page` | Blocks/Canvas pages panel / Delete Always Last Page | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--delete-always-last-page-label` | Blocks/Canvas pages panel / Delete Always Last Page Label | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--spaces-full` | Blocks/Canvas pages panel / Spaces Full | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-pages-panel--row-action-click` | Blocks/Canvas pages panel / Row Action Click | stories/components/canvas/canvas-pages-panel.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--spaces-bottom` | Blocks/Canvas toolbar / Spaces Bottom | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--spaces-left` | Blocks/Canvas toolbar / Spaces Left | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--spaces-right` | Blocks/Canvas toolbar / Spaces Right | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--local-canvas` | Blocks/Canvas toolbar / Local Canvas | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--history-unavailable` | Blocks/Canvas toolbar / History Unavailable | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--disabled` | Blocks/Canvas toolbar / Disabled | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-canvas-toolbar--tool-armed` | Blocks/Canvas toolbar / Tool Armed | stories/components/canvas/canvas-toolbar.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-presence-cursor--all-hues` | Blocks/Presence cursor / All Hues | stories/components/canvas/presence-cursor.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-presence-cursor--long-name` | Blocks/Presence cursor / Long Name | stories/components/canvas/presence-cursor.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--empty` | Blocks/Comms/ComposerShell / Empty | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--can-send` | Blocks/Comms/ComposerShell / Can Send | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--sending` | Blocks/Comms/ComposerShell / Sending | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--replying` | Blocks/Comms/ComposerShell / Replying | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--replying-to-deleted` | Blocks/Comms/ComposerShell / Replying To Deleted | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--editing` | Blocks/Comms/ComposerShell / Editing | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--with-attachments` | Blocks/Comms/ComposerShell / With Attachments | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--read-only` | Blocks/Comms/ComposerShell / Read Only | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--custom-send` | Blocks/Comms/ComposerShell / Custom Send | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--format-row` | Blocks/Comms/ComposerShell / Format Row | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--drop-active` | Blocks/Comms/ComposerShell / Drop Active | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--invalid` | Blocks/Comms/ComposerShell / Invalid | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--with-popup` | Blocks/Comms/ComposerShell / With Popup | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--editing-with-preview` | Blocks/Comms/ComposerShell / Editing With Preview | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--render-send` | Blocks/Comms/ComposerShell / Render Send | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-composershell--custom-send-label` | Blocks/Comms/ComposerShell / Custom Send Label | stories/components/comms/comms-composer-shell.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--channel` | Blocks/Comms/ConversationRow / Channel | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--private-channel` | Blocks/Comms/ConversationRow / Private Channel | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--selected` | Blocks/Comms/ConversationRow / Selected | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--unread` | Blocks/Comms/ConversationRow / Unread | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--mentions` | Blocks/Comms/ConversationRow / Mentions | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--many-unread` | Blocks/Comms/ConversationRow / Many Unread | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--direct-message-online` | Blocks/Comms/ConversationRow / Direct Message Online | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--direct-message-offline` | Blocks/Comms/ConversationRow / Direct Message Offline | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--group` | Blocks/Comms/ConversationRow / Group | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--archived` | Blocks/Comms/ConversationRow / Archived | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--long-name` | Blocks/Comms/ConversationRow / Long Name | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--list` | Blocks/Comms/ConversationRow / List | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-conversationrow--disabled-row` | Blocks/Comms/ConversationRow / Disabled Row | stories/components/comms/comms-conversation-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--head` | Blocks/Comms/MessageRow / Head | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--continuation` | Blocks/Comms/MessageRow / Continuation | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--reply` | Blocks/Comms/MessageRow / Reply | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--reply-to-deleted` | Blocks/Comms/MessageRow / Reply To Deleted | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--reply-missing` | Blocks/Comms/MessageRow / Reply Missing | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--reactions` | Blocks/Comms/MessageRow / Reactions | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--pinned` | Blocks/Comms/MessageRow / Pinned | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--edited` | Blocks/Comms/MessageRow / Edited | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--sending` | Blocks/Comms/MessageRow / Sending | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--failed` | Blocks/Comms/MessageRow / Failed | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--deleted` | Blocks/Comms/MessageRow / Deleted | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--integration` | Blocks/Comms/MessageRow / Integration | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--integration-via` | Blocks/Comms/MessageRow / Integration Via | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--editing` | Blocks/Comms/MessageRow / Editing | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--with-attachments` | Blocks/Comms/MessageRow / With Attachments | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--long-name` | Blocks/Comms/MessageRow / Long Name | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--toolbar-on-focus` | Blocks/Comms/MessageRow / Toolbar On Focus | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--author-name-slot` | Blocks/Comms/MessageRow / Author Name Slot | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--custom-labels` | Blocks/Comms/MessageRow / Custom Labels | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--transcript` | Blocks/Comms/MessageRow / Transcript | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `blocks-comms-messagerow--unread-line-label` | Blocks/Comms/MessageRow / Unread Line Label | stories/components/comms/comms-message-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessionpipeline--plan-steps` | Session/SessionPipeline / Plan Steps | stories/components/session/session-pipeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessionpipeline--tool-steps` | Session/SessionPipeline / Tool Steps | stories/components/session/session-pipeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessionpipeline--empty` | Session/SessionPipeline / Empty | stories/components/session/session-pipeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessionpipeline--long-text` | Session/SessionPipeline / Long Text | stories/components/session/session-pipeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--long` | Session/SessionTimeline / Long | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--streaming` | Session/SessionTimeline / Streaming | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--errored` | Session/SessionTimeline / Errored | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--disconnected` | Session/SessionTimeline / Disconnected | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--cancelled` | Session/SessionTimeline / Cancelled | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--many-tool-calls` | Session/SessionTimeline / Many Tool Calls | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--huge-output` | Session/SessionTimeline / Huge Output | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--live-from-the-bottom` | Session/SessionTimeline / Live From The Bottom | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--web-shaped` | Session/SessionTimeline / Web Shaped | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--without-heading` | Session/SessionTimeline / Without Heading | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--agent-mark` | Session/SessionTimeline / Agent Mark | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--author-face` | Session/SessionTimeline / Author Face | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--phone` | Session/SessionTimeline / Phone | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--deep-link-to-folded-call` | Session/SessionTimeline / Deep Link To Folded Call | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--read-the-rest` | Session/SessionTimeline / Read The Rest | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--deep-link-then-close` | Session/SessionTimeline / Deep Link Then Close | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-sessiontimeline--reveal-item` | Session/SessionTimeline / Reveal Item | stories/components/session/session-timeline.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-streamingmarkdown--static` | Session/StreamingMarkdown / Static | stories/components/session/streaming-markdown.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-streamingmarkdown--streaming` | Session/StreamingMarkdown / Streaming | stories/components/session/streaming-markdown.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-streamingmarkdown--long` | Session/StreamingMarkdown / Long | stories/components/session/streaming-markdown.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-streamingmarkdown--untrusted-input` | Session/StreamingMarkdown / Untrusted Input | stories/components/session/streaming-markdown.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--default` | Session/ToolCallCard / Default | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--statuses` | Session/ToolCallCard / Statuses | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--diff` | Session/ToolCallCard / Diff | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--new-file` | Session/ToolCallCard / New File | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--terminal` | Session/ToolCallCard / Terminal | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--truncated-payload` | Session/ToolCallCard / Truncated Payload | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--truncated-payload-loading` | Session/ToolCallCard / Truncated Payload Loading | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--truncated-payload-states` | Session/ToolCallCard / Truncated Payload States | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--binary` | Session/ToolCallCard / Binary | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--empty` | Session/ToolCallCard / Empty | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--long-title` | Session/ToolCallCard / Long Title | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--huge-output` | Session/ToolCallCard / Huge Output | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--huge-diff` | Session/ToolCallCard / Huge Diff | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--default-diff-alone` | Session/ToolCallCard / DefaultDiff | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--copy-payloads` | Session/ToolCallCard / Copy Payloads | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-toolcallcard--custom-labels` | Session/ToolCallCard / Custom Labels | stories/components/session/tool-call-card.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--user-and-answer` | Session/TurnRow / User And Answer | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--streaming` | Session/TurnRow / Streaming | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--with-attachments` | Session/TurnRow / With Attachments | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--long-prompt` | Session/TurnRow / Long Prompt | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--clamped-response` | Session/TurnRow / Clamped Response | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--run-file-summary` | Session/TurnRow / Run File Summary | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--with-thinking` | Session/TurnRow / With Thinking | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--with-plan` | Session/TurnRow / With Plan | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--with-checkpoint` | Session/TurnRow / With Checkpoint | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--failed` | Session/TurnRow / Failed | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--failed-other` | Session/TurnRow / Failed Other | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--cancelled` | Session/TurnRow / Cancelled | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--retrying` | Session/TurnRow / Retrying | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--many-tool-calls` | Session/TurnRow / Many Tool Calls | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--item-footer` | Session/TurnRow / Item Footer | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--checkpoint-footer` | Session/TurnRow / Checkpoint Footer | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--controlled-open-tool-call` | Session/TurnRow / Controlled Open Tool Call | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--plain-thinking` | Session/TurnRow / Plain Thinking | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--openable-attachments` | Session/TurnRow / Openable Attachments | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--read-the-rest` | Session/TurnRow / Read The Rest | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--read-the-rest-failed` | Session/TurnRow / Read The Rest Failed | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--read-the-rest-states` | Session/TurnRow / Read The Rest States | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `session-turnrow--controlled-tool-run` | Session/TurnRow / Controlled Tool Run | stories/components/session/turn-row.stories.tsx | — | non porté | — | C — surfaces de produit |
| `shell-appshell--default` | Shell/AppShell / Default | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--with-dock` | Shell/AppShell / With Dock | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--collapsed` | Shell/AppShell / Collapsed | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--light` | Shell/AppShell / Light | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--empty` | Shell/AppShell / Empty | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--many-items` | Shell/AppShell / Many Items | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--command-open` | Shell/AppShell / Command Open | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-appshell--phone` | Shell/AppShell / Phone | stories/components/shell/app-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-authsplit--default` | Shell/AuthSplit / Default | stories/components/shell/auth-split.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-authsplit--loading` | Shell/AuthSplit / Loading | stories/components/shell/auth-split.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-authsplit--error-state` | Shell/AuthSplit / Error | stories/components/shell/auth-split.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-authsplit--without-proof` | Shell/AuthSplit / Without Proof | stories/components/shell/auth-split.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-authsplit--long-text` | Shell/AuthSplit / Long Text | stories/components/shell/auth-split.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-commandmenu--default` | Shell/CommandMenu / Default | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-commandmenu--open` | Shell/CommandMenu / Open | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-commandmenu--filtered` | Shell/CommandMenu / Filtered | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-commandmenu--empty` | Shell/CommandMenu / Empty | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-commandmenu--many-items` | Shell/CommandMenu / Many Items | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-commandmenu--long-text` | Shell/CommandMenu / Long Text | stories/components/shell/command-menu.stories.tsx | — | non porté | — | B — overlays et menus |
| `shell-listdetail--default` | Shell/ListDetail / Default | stories/components/shell/list-detail.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-listdetail--wide` | Shell/ListDetail / Wide | stories/components/shell/list-detail.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-listdetail--empty` | Shell/ListDetail / Empty | stories/components/shell/list-detail.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-listdetail--long-text` | Shell/ListDetail / Long Text | stories/components/shell/list-detail.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-listdetail--many-items` | Shell/ListDetail / Many Items | stories/components/shell/list-detail.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--default` | Shell/OrgSwitcher / Default | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--open` | Shell/OrgSwitcher / Open | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--switch-workspace` | Shell/OrgSwitcher / Switch Workspace | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--collapsed` | Shell/OrgSwitcher / Collapsed | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--long-text` | Shell/OrgSwitcher / Long Text | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--many-items` | Shell/OrgSwitcher / Many Items | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-orgswitcher--mark` | Shell/OrgSwitcher / Mark | stories/components/shell/org-switcher.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-settingsshell--default` | Shell/SettingsShell / Default | stories/components/shell/settings-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-settingsshell--empty` | Shell/SettingsShell / Empty | stories/components/shell/settings-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-settingsshell--long-text` | Shell/SettingsShell / Long Text | stories/components/shell/settings-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-settingsshell--many-items` | Shell/SettingsShell / Many Items | stories/components/shell/settings-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-settingsshell--rail` | Shell/SettingsShell / Rail | stories/components/shell/settings-shell.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebarcontrols--default` | Shell/SidebarControls / Default | stories/components/shell/sidebar-controls.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebarcontrols--profile-open` | Shell/SidebarControls / Profile Open | stories/components/shell/sidebar-controls.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebarcontrols--info-open` | Shell/SidebarControls / Info Open | stories/components/shell/sidebar-controls.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebarcontrols--info-few-links` | Shell/SidebarControls / Info Few Links | stories/components/shell/sidebar-controls.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebarcontrols--long-text` | Shell/SidebarControls / Long Text | stories/components/shell/sidebar-controls.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--default` | Shell/Sidebar / Default | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--collapsed` | Shell/Sidebar / Collapsed | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--child-active` | Shell/Sidebar / Child Active | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--empty` | Shell/Sidebar / Empty | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--long-text` | Shell/Sidebar / Long Text | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-sidebar--many-items` | Shell/Sidebar / Many Items | stories/components/shell/sidebar.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--default` | Shell/UiScale / Default | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--open` | Shell/UiScale / Open | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--icon-only` | Shell/UiScale / Icon Only | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--at-minimum` | Shell/UiScale / At Minimum | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--panel` | Shell/UiScale / Panel | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `shell-uiscale--with-shortcuts` | Shell/UiScale / With Shortcuts | stories/components/shell/ui-scale.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--default` | Layout/AppFrame / Default | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--with-dock` | Layout/AppFrame / With Dock | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--half-dock` | Layout/AppFrame / Half Dock | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--empty` | Layout/AppFrame / Empty | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--light` | Layout/AppFrame / Light | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--titlebar-inset` | Layout/AppFrame / Titlebar Inset | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-appframe--phone` | Layout/AppFrame / Phone | stories/components/layout/app-frame.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--horizontal` | Layout/ResizableSplit / Horizontal | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--vertical` | Layout/ResizableSplit / Vertical | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--many-panes` | Layout/ResizableSplit / Many Panes | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--collapsed-pane` | Layout/ResizableSplit / Collapsed Pane | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--nested` | Layout/ResizableSplit / Nested | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-resizablesplit--light` | Layout/ResizableSplit / Light | stories/components/layout/resizable-split.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-tabstrip--default` | Layout/TabStrip / Default | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--default | vérifié | 6/6 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--states` | Layout/TabStrip / States | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--states | vérifié | 36/36 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--unfocused` | Layout/TabStrip / Unfocused | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--unfocused | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--none-active` | Layout/TabStrip / None Active | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--none-active | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--overflow` | Layout/TabStrip / Overflow | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--overflow | vérifié | 12/12 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--context-menu-on-tabs` | Layout/TabStrip / Context Menu On Tabs | stories/components/layout/tab-strip.stories.tsx | — | non porté | — | C — layout et shell |
| `layout-tabstrip--empty` | Layout/TabStrip / Empty | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--empty | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--behaviour-opt-outs` | Layout/TabStrip / Behaviour Opt Outs | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--behaviour-opt-outs | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--drag-to-reorder` | Layout/TabStrip / Drag To Reorder | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--drag-to-reorder | vérifié | 2/2 identiques, max 0.000 % | lot témoin |
| `layout-tabstrip--light` | Layout/TabStrip / Light | stories/components/layout/tab-strip.stories.tsx | gallery ?story=layout-tabstrip--light | vérifié | 1/1 identiques, max 0.000 % | lot témoin |

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
