import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X as CloseIcon } from "lucide-react";
import React, { useState } from "react";

const TermsPopup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 outline-none">
        <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
          <div className="overflow-y-auto max-h-[70vh] text-base text-gray-800 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TermsSection({ errors, agreeTerms, setAgreeTerms }) {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(c) => setAgreeTerms(!!c)}
            className="mt-1 border-gray-300"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-relaxed"
          >
            Tôi đồng ý với{" "}
            <span
              onClick={() => setShowTerms(true)}
              className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span
              onClick={() => setShowPrivacy(true)}
              className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Chính sách bảo mật
            </span>
          </Label>
        </div>
        <AnimatePresence>
          {errors?.terms && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-red-600 text-sm ml-6"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.terms}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup Terms */}
      <TermsPopup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Điều khoản Dịch vụ"
      >
        <>
          <p>
            <strong>1. Phạm vi áp dụng:</strong> Các điều khoản này áp dụng cho
            tất cả người dùng truy cập, đăng ký hoặc sử dụng nền tảng Matchlent
            (gọi tắt là “nền tảng”), bao gồm nhưng không giới hạn ở sinh viên,
            giảng viên, tổ chức giáo dục, doanh nghiệp hoặc các bên thứ ba có
            liên quan.
          </p>
          <p>
            <strong>2. Đăng ký tài khoản:</strong> Người dùng phải cung cấp
            thông tin cá nhân chính xác, đầy đủ và cập nhật trong quá trình đăng
            ký. Việc sử dụng danh tính giả mạo, thông tin sai lệch hoặc đăng ký
            thay cho người khác mà không được ủy quyền là hành vi vi phạm nghiêm
            trọng. Matchlent có quyền đình chỉ hoặc xóa tài khoản nếu phát hiện
            dấu hiệu gian lận.
          </p>
          <p>
            <strong>3. Bảo mật và quyền riêng tư:</strong> Người dùng có trách
            nhiệm bảo mật thông tin tài khoản, bao gồm tên đăng nhập, mật khẩu
            và các mã xác thực. Bất kỳ hoạt động nào phát sinh từ tài khoản của
            bạn sẽ được xem là do bạn thực hiện, trừ khi được chứng minh ngược
            lại. Matchlent cam kết bảo vệ dữ liệu người dùng theo Chính sách Bảo
            mật nhưng không chịu trách nhiệm trong trường hợp mất mát do lỗi bảo
            mật từ phía người dùng.
          </p>
          <p>
            <strong>4. Quy tắc hành xử:</strong> Người dùng phải tuân thủ quy
            định pháp luật hiện hành, tránh các hành vi bao gồm nhưng không giới
            hạn: đăng tải nội dung vi phạm bản quyền, thông tin sai sự thật, lời
            lẽ thù ghét, kỳ thị, spam, quảng cáo không được phép hoặc hành vi
            xâm phạm đến danh dự, nhân phẩm người khác. Matchlent có cơ chế báo
            cáo, xử lý và loại bỏ nội dung vi phạm.
          </p>
          <p>
            <strong>5. Trách nhiệm nội dung:</strong> Người dùng chịu hoàn toàn
            trách nhiệm về nội dung mình tạo, bao gồm dự án, mô tả, tài liệu
            đính kèm và bình luận. Bằng việc đăng tải, bạn đồng ý cấp cho
            Matchlent quyền sử dụng, lưu trữ, xử lý, hiển thị và phân phối nội
            dung trong phạm vi hoạt động của nền tảng, không giới hạn thời gian
            và không cần thêm thù lao.
          </p>
          <p>
            <strong>6. Hỗ trợ và phản hồi:</strong> Chúng tôi khuyến khích người
            dùng liên hệ với bộ phận hỗ trợ khách hàng để được giải đáp thắc mắc
            hoặc góp ý xây dựng nền tảng. Các phản hồi có thể được sử dụng để
            cải tiến sản phẩm, nâng cao trải nghiệm người dùng mà không cần
            thông báo hoặc bồi thường.
          </p>
          <p>
            <strong>7. Tạm ngừng hoặc chấm dứt dịch vụ:</strong> Matchlent có
            quyền, không cần báo trước, tạm ngừng hoặc chấm dứt quyền truy cập
            của người dùng nếu vi phạm điều khoản, gây ảnh hưởng đến cộng đồng
            hoặc an ninh hệ thống. Người dùng cũng có thể yêu cầu xóa tài khoản
            bất kỳ lúc nào qua email chính thức.
          </p>
          <p>
            <strong>8. Sở hữu trí tuệ:</strong> Tất cả biểu tượng, giao diện, mã
            nguồn, tài sản trí tuệ liên quan đến nền tảng là tài sản thuộc về
            Matchlent hoặc bên thứ ba có giấy phép sử dụng. Nghiêm cấm sao chép,
            phân phối hoặc khai thác thương mại nếu không được sự đồng ý bằng
            văn bản.
          </p>
          <p>
            <strong>9. Cập nhật điều khoản:</strong> Matchlent có thể cập nhật
            các điều khoản này để phù hợp với thay đổi pháp lý, kỹ thuật hoặc
            mục tiêu vận hành. Chúng tôi sẽ thông báo bằng cách đăng tải trên
            website, và việc tiếp tục sử dụng dịch vụ sau thời điểm cập nhật
            đồng nghĩa bạn đã chấp nhận.
          </p>
          <p>
            <strong>10. Giới hạn trách nhiệm:</strong> Nền tảng được cung cấp
            “như hiện có”, không cam kết đảm bảo tuyệt đối về tính liên tục,
            chính xác hay bảo mật. Trong mọi trường hợp, trách nhiệm của
            Matchlent sẽ không vượt quá khoản phí bạn đã thanh toán (nếu có)
            trong vòng 6 tháng gần nhất.
          </p>
        </>
      </TermsPopup>

      {/* Popup Privacy */}
      <TermsPopup
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Chính sách Bảo mật"
      >
        <>
          <p>
            <strong>1. Mục tiêu:</strong> Chính sách Bảo mật này nhằm giải thích
            rõ ràng về cách Matchlent thu thập, sử dụng, lưu trữ, chia sẻ và bảo
            vệ dữ liệu cá nhân của người dùng trên nền tảng. Chúng tôi cam kết
            tuân thủ đầy đủ quy định pháp luật về bảo vệ dữ liệu cá nhân, bao
            gồm cả các nguyên tắc minh bạch, đồng thuận và bảo mật.
          </p>
          <p>
            <strong>2. Loại dữ liệu thu thập:</strong> Chúng tôi có thể thu thập
            các loại dữ liệu sau: (a) Thông tin định danh (họ tên, email, ảnh
            đại diện, mật khẩu), (b) Thông tin học thuật và nghề nghiệp (trường
            học, kỹ năng, kinh nghiệm, hồ sơ dự án), (c) Dữ liệu hành vi (lịch
            sử truy cập, nội dung quan tâm, tương tác), (d) Thông tin thiết bị
            (IP, trình duyệt, hệ điều hành, cookies).
          </p>
          <p>
            <strong>3. Mục đích sử dụng:</strong> Dữ liệu được sử dụng để (a)
            tạo và quản lý tài khoản người dùng, (b) cá nhân hóa nội dung và
            trải nghiệm, (c) cải tiến sản phẩm dựa trên hành vi người dùng, (d)
            liên hệ và gửi thông báo liên quan đến tài khoản hoặc dịch vụ, (e)
            tuân thủ yêu cầu pháp lý và điều tra hành vi vi phạm.
          </p>
          <p>
            <strong>4. Lưu trữ dữ liệu:</strong> Dữ liệu người dùng được lưu trữ
            trên hệ thống máy chủ đám mây an toàn đặt tại quốc gia có quy định
            bảo mật dữ liệu tương đương với chuẩn quốc tế. Dữ liệu sẽ được mã
            hóa trong quá trình truyền tải và lưu trữ, đồng thời có cơ chế kiểm
            soát truy cập nghiêm ngặt để ngăn chặn truy cập trái phép.
          </p>
          <p>
            <strong>5. Chia sẻ thông tin:</strong> Matchlent không chia sẻ thông
            tin cá nhân với bên thứ ba ngoại trừ trong các trường hợp: (a) bạn
            đồng ý rõ ràng, (b) chia sẻ với đối tác dự án sau khi bạn gửi đơn
            ứng tuyển, (c) yêu cầu của cơ quan pháp luật, (d) sáp nhập hoặc
            chuyển nhượng dịch vụ cho bên khác.
          </p>
          <p>
            <strong>6. Quyền của người dùng:</strong> Bạn có quyền (a) truy cập
            dữ liệu cá nhân, (b) yêu cầu chỉnh sửa thông tin không chính xác,
            (c) yêu cầu xóa vĩnh viễn tài khoản và dữ liệu, (d) rút lại sự đồng
            ý bất kỳ lúc nào, ảnh hưởng đến việc tiếp tục xử lý dữ liệu. Mọi yêu
            cầu được xử lý trong vòng 14 ngày làm việc qua email hỗ trợ.
          </p>
          <p>
            <strong>7. Cookie và công nghệ tương tự:</strong> Chúng tôi sử dụng
            cookie để lưu thông tin đăng nhập, phân tích hành vi người dùng và
            đề xuất nội dung phù hợp. Người dùng có thể cấu hình trình duyệt để
            từ chối hoặc xóa cookie, tuy nhiên điều này có thể ảnh hưởng đến một
            số tính năng.
          </p>
          <p>
            <strong>8. Bảo mật thông tin:</strong> Matchlent áp dụng các biện
            pháp kỹ thuật và tổ chức để đảm bảo an toàn dữ liệu, bao gồm mã hóa
            SSL, tường lửa, giám sát truy cập và sao lưu định kỳ. Tuy nhiên,
            không có hệ thống nào an toàn tuyệt đối, vì vậy người dùng cũng cần
            chủ động bảo vệ thiết bị cá nhân và tránh chia sẻ thông tin nhạy
            cảm.
          </p>
          <p>
            <strong>9. Dữ liệu người dùng chưa thành niên:</strong> Nếu bạn dưới
            16 tuổi, bạn phải có sự đồng ý của cha mẹ hoặc người giám hộ hợp
            pháp trước khi sử dụng nền tảng. Chúng tôi không cố ý thu thập dữ
            liệu từ người dùng chưa đủ tuổi.
          </p>
          <p>
            <strong>10. Thay đổi chính sách:</strong> Chính sách này có thể được
            cập nhật để phù hợp với thay đổi về pháp luật, kỹ thuật hoặc nhu cầu
            kinh doanh. Các thay đổi sẽ được thông báo qua website. Nếu bạn tiếp
            tục sử dụng nền tảng sau khi chính sách được cập nhật, điều đó đồng
            nghĩa với việc bạn đã đồng ý với các thay đổi.
          </p>
        </>
      </TermsPopup>
    </>
  );
}
