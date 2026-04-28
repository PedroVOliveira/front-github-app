import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
  title: string
  description: string
  onConfirm: () => void
  children: React.ReactNode
  confirmText?: string
  cancelText?: string
}

const ConfirmDialog = ({
  title,
  description,
  onConfirm,
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: ConfirmDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-[2.5rem] border-zinc-200 bg-white p-8 text-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:max-w-[420px]">
        <AlertDialogHeader className="space-y-4">
          <AlertDialogTitle className="text-3xl font-black tracking-tighter text-zinc-900 leading-none">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-500 text-lg font-medium leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-10 flex-row gap-4 p-0">
          <AlertDialogCancel className="flex-1 rounded-2xl border-none bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-all font-bold h-14 text-base">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg shadow-red-500/20 border-none h-14 text-base active:scale-95"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog
