import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Edit, Plus, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { addSkill, updateSkill } from "@/utils/userApi";

const SkillModal = ({
  isOpen,
  onClose,
  userId,
  isTokenValid,
  mode = "add",
  initialSkill = "",
  onSuccess,
}) => {
  const [skillName, setSkillName] = useState("");
  const [previewSkill, setPreviewSkill] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      setSkillName(initialSkill);
    } else {
      setSkillName("");
      setPreviewSkill(null);
    }
  }, [mode, initialSkill, isOpen]);

  const handleSubmit = async () => {
    if (!skillName.trim() || !isTokenValid) return;
    setIsSubmitting(true);

    try {
      if (mode === "add") {
        const skillData = { skill: skillName.trim() };
        await addSkill(userId, skillData);
      } else {
        await updateSkill(userId, initialSkill, skillName.trim());
      }

      onSuccess();
      onClose();

      Swal.fire({
        icon: "success",
        title: `${mode === "add" ? "Thêm" : "Cập nhật"} kỹ năng thành công!`,
      });
    } catch (error) {
      console.error(
        `${mode === "add" ? "Thêm" : "Cập nhật"} kỹ năng thất bại:`,
        error
      );
      Swal.fire({
        icon: "error",
        title: `${mode === "add" ? "Thêm" : "Cập nhật"} kỹ năng thất bại!`,
        text:
          error.status === 401
            ? "Phiên đăng nhập đã hết hạn."
            : `Đã có lỗi xảy ra khi ${
                mode === "add" ? "thêm" : "cập nhật"
              } kỹ năng. Vui lòng thử lại.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (mode === "add") {
        setPreviewSkill(skillName.trim());
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-xl border-0 shadow-xl p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
            {mode === "add" ? (
              <Award className="h-5 w-5 text-purple-600 mr-2" />
            ) : (
              <Edit className="h-5 w-5 text-purple-600 mr-2" />
            )}
            {mode === "add" ? "Thêm kỹ năng mới" : "Chỉnh sửa kỹ năng"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="skill-input"
              className="text-sm font-medium text-gray-700"
            >
              Tên kỹ năng
            </Label>
            <Input
              id="skill-input"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder={
                mode === "add"
                  ? "Ví dụ: React, Node.js, UX Design..."
                  : "Nhập tên kỹ năng mới..."
              }
              className="border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyDown={handleKeyDown}
              disabled={!isTokenValid || isSubmitting}
            />
          </div>

          {/* Preview section for add mode */}
          {mode === "add" && previewSkill && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Xem trước:</span>
              <Badge className="bg-purple-100 text-purple-800 border-0 shadow-sm px-2 py-1 text-xs">
                {previewSkill}
              </Badge>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Hủy
            </Button>
            <Button
              onClick={() => {
                if (mode === "add" && !previewSkill) {
                  setPreviewSkill(skillName.trim());
                } else {
                  handleSubmit();
                }
              }}
              disabled={
                !skillName.trim() ||
                !isTokenValid ||
                isSubmitting ||
                (mode === "edit" && skillName.trim() === initialSkill)
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">
                    <Loader2 className="h-4 w-4" />
                  </span>
                  Đang xử lý...
                </span>
              ) : mode === "add" ? (
                previewSkill ? (
                  "Xác nhận"
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm
                  </>
                )
              ) : (
                "Cập nhật"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillModal;
