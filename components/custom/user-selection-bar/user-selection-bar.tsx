"use client"

import React from "react"
import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { type UserSelectionBarProps } from "./type"
import { ConfirmDialog } from "@/components/custom/confirm-dialog"

const UserSelectionBar = ({
  isVisible,
  selectedCount,
  onDelete,
  onSelectAll,
  onClear,
  isAllSelected,
}: UserSelectionBarProps) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
      <Collapsible open={isVisible} className="w-full pointer-events-auto">
        <CollapsibleContent
          className={cn(
            "overflow-hidden transition-all duration-500 ease-in-out",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-bottom-10 data-[state=open]:slide-in-from-bottom-10"
          )}
        >
          <div className="flex items-center gap-6 p-4 bg-zinc-900/90 backdrop-blur-md text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5">
            <div className="flex items-center gap-3 pl-2">
              <Checkbox
                id="select-all-bulk"
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                className="size-5 border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900 transition-all"
              />
              <label
                htmlFor="select-all-bulk"
                className="text-sm font-bold cursor-pointer select-none whitespace-nowrap"
              >
                {isAllSelected ? "Desmarcar Todos" : "Selecionar Todos"}
              </label>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-white rounded text-[10px] font-black text-black">
                {selectedCount}
              </span>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                itens
              </span>
            </div>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-9 px-4 text-zinc-400 hover:text-white hover:bg-white/5 gap-2 font-bold transition-all rounded-xl"
              >
                <X className="size-4" />
                <span>Cancelar</span>
              </Button>

              <ConfirmDialog
                title="Excluir usuários selecionados?"
                description={`Você está prestes a excluir ${selectedCount} usuário(s). Esta ação não pode ser desfeita.`}
                onConfirm={onDelete}
                confirmText="Excluir"
              >
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-9 px-5 gap-2 font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40 active:scale-95 transition-all uppercase tracking-wide border-none rounded-xl"
                >
                  <Trash2 className="size-4 text-white" />
                  <span>Excluir</span>
                </Button>
              </ConfirmDialog>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default UserSelectionBar
