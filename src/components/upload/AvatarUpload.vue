<template>
  <div class="avatarUpload">
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="handleChange"
      :name="name"
      ref="avatarUpload"
      :disabled="disabled"
    >
      <!-- <div
        slot="file"
        slot-scope="{file}"
      >
       
      </div> -->
      <img
        class="avatar"
        v-if="avatarURL"
        :src="avatarURL"
      />
      <el-icon
        class="avatar-uploader-icon"
        v-else
      >
        <Plus />
      </el-icon>
    </el-upload>
  </div>
  <!-- <el-icon
    class="editImg"
    @click="editAvatar"
  >
    <Edit />
  </el-icon> -->
</template>

<script>
import { Plus, Edit } from "@element-plus/icons-vue";


export default {
  name: "AvatarUpload",
  components: {
    Plus,
    Edit
  },

  props: {
    name: {
      type: String,
      default: 'file'
    },
  },
  data () {
    return {
      avatarURL: "",
      disabled: false,
      file: {}
    };
  },
  emits: ['avatarFile'],
  methods: {
    // 图片修改
    handleChange (file, fileList) {
      const isformat = ["image/png", "image/jpeg", "image/jpg"].indexOf(file.raw.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isformat === -1) {
        return this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        return this.$message.error("上传头像图片大小不能超过 2MB!");
      }


      this.avatarURL = URL.createObjectURL(file.raw)
      this.$emit('avatarFile', this.avatarURL)
      this.file = file

      // if (!isformat || !isLt2M) {
      //   this.handleRemove(file);
      // }
      /*  let formData = new FormData();
       const headerConfig = {
         headers: { "Content-Type": "multipart/form-data" },
       };
       formData.append("avatar", file.raw);
       const { data: res } = await this.$http.post(
         "/uploadImage",
         formData,
         headerConfig
       );
       if (res.status !== 200) return this.$message.error("图片上传失败！");
       this.imageUrl = res.data.url;
       return this.$message.success("图片上传成功！"); */
    },
    // 图片删除
    handleRemove () {
      this.avatarURL = ''
    }
  }
};
</script>

<style  lang="less" scoped>
.avatarUpload {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatarUpload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 14px;
  color: #b6b8ba;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.editImg {
  width: 24px;
  height: 24px;
  color: #ccc;
}
</style>