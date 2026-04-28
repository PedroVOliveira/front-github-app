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

const UserSelectionBar = ({
  selectedCount,
  totalCount,
  onDelete,
  onSelectAll,
  onClear,
  isAllSelected,
}: UserSelectionBarProps) => {
  const isOpen = selectedCount > 0

  return (
    <Collapsible open={isOpen} className="w-full">
      <CollapsibleContent 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2"
        )}
      >
        <div className="mb-6 flex items-center justify-between p-4 bg-zinc-900 text-white rounded-2xl shadow-xl border border-zinc-800">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-2">
              <Checkbox 
                id="select-all-bulk"
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
                className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-zinc-900"
              />
              <label 
                htmlFor="select-all-bulk" 
                className="text-sm font-bold cursor-pointer select-none"
              >
                {isAllSelected ? "Desmarcar Todos" : "Selecionar Todos"}
              </label>
            </div>
            
            <div className="h-6 w-px bg-zinc-700" />
            
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-6 bg-zinc-800 rounded-full text-xs font-bold border border-zinc-700">
                {selectedCount}
              </span>
              <span className="text-sm font-medium text-zinc-400">
                usuário(s) selecionado(s)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2 font-semibold"
            >
              <X className="size-4" />
              Cancelar
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={onDelete}
              className="gap-2 font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20"
            >
              <Trash2 className="size-4" />
              Excluir Selecionados
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default UserSelectionBar
